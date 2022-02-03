from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import AssignmentSerializer
from api.models import Course, Assignment
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime, timedelta


class ScheduleAssignments(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        assignments = getAssignments(request.user.id)
        addScheduleTimes(assignments)
        return Response({'Success': "Added Assignment Times"}, status=HTTP_200_OK)


def addScheduleTimes(assignments):
    current_time = datetime.now()
    for assignment in assignments:
        current_assignment = Assignment.objects.get(id=assignment.id)
        current_assignment.scheduled_start = current_time
        current_assignment.scheduled_finish = current_time + \
            timedelta(minutes=1)
        current_assignment.save(
            update_fields=['scheduled_start', 'scheduled_finish'])
        current_time += timedelta(minutes=1)


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
