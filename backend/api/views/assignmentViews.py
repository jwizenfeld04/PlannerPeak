from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import AssignmentSerializer
from api.models import Course, Assignment
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime


class UserCurrentAssignmentView(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        pass


class UserAssignmentView(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        course_ids = Course.objects.filter(
            user_id=request.user.id).values_list('pk', flat=True)
        if len(course_ids) == 0:
            return Response({"No Content": "No Assignments Found"}, status=HTTP_204_NO_CONTENT)
        data = []
        for id in course_ids:
            assignments = Assignment.objects.filter(
                course_id=id)
            if len(assignments) > 0:
                data.append(self.serializer_class(assignments, many=True).data)
        return Response(data, status=HTTP_200_OK)


class UserSpecificAssignmentView(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        assignments = Assignment.objects.filter(
            course_id=self.kwargs['course_id'])
        if len(assignments) > 0:
            data = self.serializer_class(assignments, many=True).data
            return Response(data, status=HTTP_200_OK)
        return Response({"No Content": "No Assignments Found"}, status=HTTP_204_NO_CONTENT)

    def post(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user.id
            user_courses = Course.objects.filter(user_id=user)
            # Converts array of objects to an array of ids for those objects
            ids = user_courses.values_list('pk', flat=True)
            this_course = self.kwargs['course_id']
            if len(user_courses) > 0:
                # Check to make sure that course belongs to that user
                if this_course in ids:
                    name = serializer.data.get('name')
                    description = serializer.data.get('description')
                    start_date = datetime.now()
                    due_date = serializer.data.get('due_date')
                    assignment = Assignment(course_id=self.kwargs['course_id'],
                                            name=name, description=description, start_date=start_date, due_date=due_date)
                    assignment.save()
                    return Response(self.serializer_class(assignment).data, status=HTTP_201_CREATED)
                return Response({"Error": "Invalid Permissions "}, status=HTTP_403_FORBIDDEN)
            return Response({"Error": "No Courses "}, status=HTTP_400_BAD_REQUEST)
        return Response({"Error": "Invalid Assignment Fields"}, status=HTTP_400_BAD_REQUEST)


class UserSpecificAssignmentUpdateView(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

# No User Verification Right Now, Pass Course ID in url to fix issue or add user foregin key in assignment
    def put(self, request, format=None, *args, **kwargs):
        assignment_id = self.kwargs['assignment_id']
        try:
            assignment = Assignment.objects.get(
                id=assignment_id)
        except:
            return Response({"Error": "Invalid Assignment Id"}, status=HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(assignment, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_204_NO_CONTENT)
        return Response({"Error": "Invalid Update Fields"}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None, *args, **kwargs):
        assignment_id = self.kwargs['assignment_id']
        try:
            assignment = Assignment.objects.get(
                id=assignment_id)
        except:
            return Response({"Error": "Invalid Assignment Id"}, status=HTTP_400_BAD_REQUEST)
        assignment.delete()
        return Response({"Successful": "Assignment Deleted"}, status=HTTP_204_NO_CONTENT)
