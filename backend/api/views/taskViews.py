from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import AssignmentSerializer, TaskSerializer
from api.models import Course, Assignment, AssignmentSchedule, Task
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime, timezone, timedelta
from django.shortcuts import get_object_or_404



class UserCreateTaskView(CreateAPIView):
    serializer_class = TaskSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]


class UserUpdateTaskView(RetrieveUpdateAPIView):
    serializer_class = TaskSerializer
    lookup_field = 'id'

    def get_object(self, queryset=None):
        task_id = self.kwargs.get('task_id')
        return get_object_or_404(Task, id=task_id)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            if 'is_completed' in request.data and request.data['is_completed'] == True:
                instance.update_completed_date()
            return Response({"Updated Task": serializer})

        else:
            return Response({"message": "failed", "details": serializer.errors})


class UserHistoryView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user_id = request.user.id
        history = []
        last_two_months = datetime.today() - timedelta(days=60)
        tasks = Task.objects.filter(user_id=user_id, is_completed=True,
                                    completed_date__gte=last_two_months)
        if len(tasks) != 0:
            history.extend(TaskSerializer(tasks, many=True).data)
        course_ids = Course.objects.filter(
            user_id=request.user.id).values_list('pk', flat=True)
        all_assignments = []
        for id in course_ids:
            assignments = Assignment.objects.filter(course_id=id, is_completed=True,
                                                    completed_date__gte=last_two_months)
            if len(assignments) != 0:
                all_assignments.extend(AssignmentSerializer(
                    assignments, many=True).data)

        history.extend(all_assignments)
        return Response(history, status=HTTP_200_OK)
