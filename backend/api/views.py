from rest_framework import authentication
from rest_framework.views import APIView
from schoolopy.authentication import Auth
from .serializers import CourseSerializer, AssignmentSerializer
from .models import Course, Assignment, CustomUser, SchoologyTokens
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime
import schoolopy


class UserSpecificCourseView(APIView):
    serializer_class = CourseSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        courses = Course.objects.filter(user_id=request.user.id)
        if len(courses) > 0:
            data = self.serializer_class(courses, many=True).data
            return Response(data, status=HTTP_200_OK)
        return Response({"No Content": "No Courses Found"}, status=HTTP_204_NO_CONTENT)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            subject = serializer.data.get('subject')
            course = Course(user_id=request.user.id,
                            name=name, subject=subject)
            course.save()
            return Response(self.serializer_class(course).data, status=HTTP_201_CREATED)
        return Response({"Error": "Invalid Course Fields"}, status=HTTP_400_BAD_REQUEST)


class UserSpecificCourseUpdateView(APIView):
    serializer_class = CourseSerializer
    authentication_classes = [authentication.TokenAuthentication]

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
                return Response(serializer.data, status=HTTP_204_NO_CONTENT)
            return Response({"Error": "Invalid Update Fields"}, status=HTTP_400_BAD_REQUEST)
        return Response({"Error": "Invalid Course Id or Permissions "}, status=HTTP_403_FORBIDDEN)

    def delete(self, request, format=None, *args, **kwargs):
        user_id = request.user.id
        course_id = self.kwargs['course_id']
        course = self.verify_course(user_id, course_id)
        if course:
            course.delete()
            return Response({"Successful": "Course Deleted"}, status=HTTP_204_NO_CONTENT)
        return Response({"Error": "Invalid Course Id or Permissions "}, status=HTTP_403_FORBIDDEN)


class UserSpecificAssignmentView(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]

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

# Get Request is Oauth1 Request Authorization and Post make sure it's authorized and run Auth and get access tokens


class SchoologyAuth(APIView):
    global auth
    auth = schoolopy.Auth('74f43bf30d6895e48da903216442c45d060e18834', '06987ff5effb04457a21ffbeefff5106',
                          three_legged=True)

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        if user.is_schoology_authenticated:
            return Response({"Already Authorized With Schoology": "No more Auth"}, status=HTTP_204_NO_CONTENT)
        request_url = auth.request_authorization(
            callback_url="localhost:19006")
        return Response({'authUrl': request_url}, status=HTTP_200_OK)

    # Need to pass reuqest token and secret here
    def post(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        if user.is_schoology_authenticated:
            return Response({"Already Authorized With Schoology": "No more Auth"}, status=HTTP_204_NO_CONTENT)
        auth.authorize()
        auth.oauth.token = {'oauth_token': auth.access_token,
                            'oauth_token_secret': auth.access_token_secret}
        schoology_tokens = SchoologyTokens()
        schoology_tokens.user_id = user.id
        schoology_tokens.access_token = auth.access_token
        schoology_tokens.access_secret = auth.access_token_secret
        schoology_tokens.save()
        user.is_schoology_authenticated = True
        sc = schoolopy.Schoology(auth)
        user.schoology_id = sc.get_me().uid
        user.save(update_fields=["is_schoology_authenticated", "schoology_id"])
        return Response({'Success': auth.access_token}, status=HTTP_200_OK)


def getSchoologyTokens(user_id):
    try:
        tokens = SchoologyTokens.objects.get(user_id=user_id)
    except:
        return Response({'Unauthorized': 'Please Authorize with Schoology'}, status=HTTP_401_UNAUTHORIZED)
    access_token = tokens.access_token
    access_secret = tokens.access_secret
    schoologyauth = schoolopy.Auth('74f43bf30d6895e48da903216442c45d060e18834', '06987ff5effb04457a21ffbeefff5106',
                                   three_legged=True, access_token=access_token, access_token_secret=access_secret)
    schoologyauth.oauth.token = {
        'oauth_token': access_token, 'oauth_token_secret': access_secret}
    sc = schoolopy.Schoology(schoologyauth)
    return sc


class SchoologyCourses(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        user_schoology_course_ids = list(Course.objects.filter(
            user_id=user.id, is_schoology=True).values_list('schoology_section_id', flat=True))
        sc = getSchoologyTokens(user.id)
        schoology_courses = sc.get_user_sections(user_id=user.schoology_id)
        for i in range(len(schoology_courses)):
            if schoology_courses[i]['id'] not in user_schoology_course_ids:
                course = Course()
                course.user_id = user.id
                course.name = schoology_courses[i]['course_title']
                course.schoology_class_id = schoology_courses[i]['course_id']
                course.schoology_section_id = schoology_courses[i]['id']
                # Need to map the integer input of the subjects from schoology to get the right one
                course.subject = "Test"
                course.is_schoology = True
                course.save()
        return Response({'Success': "New Courses Added"}, status=HTTP_200_OK)


class SchoologyGrades(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        sc = getSchoologyTokens(user.id)
        schoology_courses_ids = list(Course.objects.filter(
            user_id=user.id, is_schoology=True).values_list('schoology_section_id', flat=True))
        for i in range(len(schoology_courses_ids)):
            section_id = sc.get_user_grades(user.schoology_id)[
                i]['section_id']
            course = Course.objects.get(
                user_id=user.id, schoology_section_id=section_id)
            course.grade = sc.get_user_grades(user.schoology_id)[
                i]['final_grade'][1]['grade']
            course.save(update_fields=['grade'])
        return Response({"Success": "Works"}, status=HTTP_200_OK)


class SchoologyAssignments(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        user_schoology_courses = Course.objects.filter(
            user_id=user.id, is_schoology=True)
        sc = getSchoologyTokens(user.id)
        for course in user_schoology_courses:
            schoology_assignments = sc.get_assignments(
                course.schoology_section_id)
            user_assignments_id = list(Assignment.objects.filter(
                course_id=course.id, is_schoology=True).values_list('schoology_assignment_id', flat=True
                                                                    ))
            for assignment in schoology_assignments:
                if str(assignment['id']) not in user_assignments_id:
                    new_assignment = Assignment()
                    new_assignment.course_id = course.id
                    new_assignment.schoology_assignment_id = assignment['id']
                    new_assignment.description = assignment['description']
                    new_assignment.name = assignment['title']
                    new_assignment.due_date = assignment['due']
                    new_assignment.assignment_type = assignment['type']
                    new_assignment.is_completed = assignment['completed']
                    new_assignment.is_schoology = True
                    new_assignment.save()
        return Response({'Success': "New Assignments Added"}, status=HTTP_200_OK)
