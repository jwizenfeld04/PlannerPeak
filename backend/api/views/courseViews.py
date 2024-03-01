from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import CourseSerializer
from api.models import Course
from rest_framework.response import Response
from rest_framework.status import *


class UserSpecificCourseView(APIView):
    serializer_class = CourseSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        courses = Course.objects.filter(
            user_id=request.user.id, deleted=None).order_by('id')
        if len(courses) > 0:
            return Response(self.serializer_class(courses, many=True).data, status=HTTP_200_OK)
        return Response({"No Content": "No Courses Found"}, status=HTTP_204_NO_CONTENT)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            subject = serializer.data.get('subject')
            color = serializer.data.get('color')
            if color:
                course = Course(user_id=request.user.id,
                            name=name, subject=subject, color=color)
            else:
                course = Course(user_id=request.user.id,
                            name=name, subject=subject)
            course.save()
            return Response(self.serializer_class(course).data, status=HTTP_201_CREATED)
        return Response({"Error": "Invalid Course Fields"}, status=HTTP_400_BAD_REQUEST)


class UserSpecificCourseUpdateView(APIView):
    serializer_class = CourseSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def verify_course(self, user_id, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except:
            return False
        user_courses = Course.objects.filter(user_id=user_id)
        ids = user_courses.values_list('pk', flat=True)
        if course.id in ids:
            return course
        return False

    def put(self, request, format=None, *args, **kwargs):
        user_id = request.user.id
        course_id = self.kwargs['course_id']
        course = self.verify_course(user_id, course_id)
        if course:
            serializer = self.serializer_class(course, request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_202_ACCEPTED)
            return Response({"Error": "Invalid Update Fields"}, status=HTTP_400_BAD_REQUEST)
        return Response({"Error": "Invalid Course Id or Permissions "}, status=HTTP_403_FORBIDDEN)

    def delete(self, request, format=None, *args, **kwargs):
        user_id = request.user.id
        course_id = self.kwargs['course_id']
        course = self.verify_course(user_id, course_id)
        if course:
            course.delete()
            return Response(self.serializer_class(course).data, status=HTTP_202_ACCEPTED)
        return Response({"Error": "Invalid Course Id or Permissions "}, status=HTTP_403_FORBIDDEN)

    #RESTORE COURSE
    # def post(self, request, format=None, *args, **kwargs):
    #     user_id = request.user.id
    #     course_id = self.kwargs['course_id']
    #     course = self.verify_course(user_id, course_id)
    #     course.undelete()
    #     return Response(self.serializer_class(course).data, status=HTTP_202_ACCEPTED)
        
