from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import AssignmentSerializer
from api.models import Course, Assignment
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime, timedelta, timezone, date, time


class ScheduleAssignments(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        assignments = getAssignments(request.user.id)
        addScheduleTimes(assignments)
        return Response({'Success': "Added Assignment Times"}, status=HTTP_200_OK)


class CurrentSchedule(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        assignments = getAssignmentsCurrentSchedule(request.user.id)
        if len(assignments) == 0:
            return Response({"No Assignments": "Empty Schedule"}, status=HTTP_204_NO_CONTENT)
        ordered_assignments = orderAssignments(assignments)
        return Response(self.serializer_class(ordered_assignments, many=True).data, status=HTTP_200_OK)


class SpecficDateSchedule(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        assignments = getAssignmentsScheduleDate(
            request.user.id, self.kwargs['date'])
        if len(assignments) == 0:
            return Response({"No Assignments": "Empty Schedule"}, status=HTTP_204_NO_CONTENT)
        ordered_assignments = orderAssignments(assignments)
        return Response(self.serializer_class(ordered_assignments, many=True).data, status=HTTP_200_OK)


def addScheduleTimes(assignments):
    current_time = datetime.now(tz=timezone.utc)
    for assignment in assignments:
        current_assignment = Assignment.objects.get(id=assignment.id)
        current_assignment.scheduled_start = current_time + \
            timedelta(minutes=1)
        current_assignment.scheduled_finish = current_time + \
            timedelta(minutes=3)
        current_assignment.save(
            update_fields=['scheduled_start', 'scheduled_finish'])
        current_time += timedelta(minutes=2)


def getAssignments(user_id):
    course_ids = Course.objects.filter(
        user_id=user_id).values_list('pk', flat=True).order_by('-priority')
    if len(course_ids) == 0:
        return Response({"No Content": "No Assignments Found"}, status=HTTP_204_NO_CONTENT)
    all_assignments = []
    for id in course_ids:
        assignments = Assignment.objects.filter(
            course_id=id).order_by('due_date')
        if len(assignments) > 0:
            all_assignments.append(
                assignments)
    flatlist_all_assignments = [
        element for sublist in all_assignments for element in sublist]
    return flatlist_all_assignments


def orderAssignments(assignments):
    for i in range(len(assignments)):
        # Find the minimum element in remaining
        # unsorted array
        min_idx = i
        for j in range(i+1, len(assignments)):
            if assignments[min_idx].scheduled_start > assignments[j].scheduled_start:
                min_idx = j
        # Swap the found minimum element with
        # the first element
        assignments[i], assignments[min_idx] = assignments[min_idx], assignments[i]
    return assignments


def getAssignmentsCurrentSchedule(user_id):
    course_ids = Course.objects.filter(
        user_id=user_id).values_list('pk', flat=True)
    if len(course_ids) == 0:
        return Response({"No Content": "No Assignments Found"}, status=HTTP_204_NO_CONTENT)
    all_assignments = []
    current_time = datetime.now(timezone.utc)
    end_of_day = datetime.combine(date.today(), time.max)
    for id in course_ids:
        assignments = Assignment.objects.filter(
            course_id=id, scheduled_start__range=(current_time, end_of_day)).order_by('scheduled_start')
        if len(assignments) > 0:
            all_assignments.append(
                assignments)
    flatlist_all_assignments = [
        element for sublist in all_assignments for element in sublist]
    return flatlist_all_assignments


def getAssignmentsScheduleDate(user_id, date):
    course_ids = Course.objects.filter(
        user_id=user_id).values_list('pk', flat=True)
    if len(course_ids) == 0:
        return Response({"No Content": "No Assignments Found"}, status=HTTP_204_NO_CONTENT)
    all_assignments = []
    start_of_day = datetime.combine(date, time.min)
    end_of_day = datetime.combine(date, time.max)
    for id in course_ids:
        assignments = Assignment.objects.filter(
            course_id=id, scheduled_start__range=(start_of_day, end_of_day)).order_by('scheduled_start')
        if len(assignments) > 0:
            all_assignments.append(
                assignments)
    flatlist_all_assignments = [
        element for sublist in all_assignments for element in sublist]
    return flatlist_all_assignments
