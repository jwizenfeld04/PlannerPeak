from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from schoolopy.authentication import Auth
from .serializers import CourseSerializer, AssignmentSerializer, SchoologyCallbackSerializer
from .models import Course, Assignment, CustomUser, SchoologyToken, CourseMeetingDay
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime
import schoolopy
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

CONSUMER_KEY = os.environ.get("SCHOOLOGY_CONSUMER_KEY")
CONSUMER_SECRET = os.environ.get("SCHOOLOGY_CONSUMER_SECRET")


class UserSpecificCourseView(APIView):
    serializer_class = CourseSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        courses = Course.objects.filter(
            user_id=request.user.id, is_active=True).order_by('id')
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

# Get Request is Oauth1 Request Authorization and Post make sure it's authorized and run Auth and get access tokens


class SchoologyAuth(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SchoologyCallbackSerializer

    global auth
    auth = schoolopy.Auth(CONSUMER_KEY, CONSUMER_SECRET, three_legged=True)

    def post(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            callback = serializer.data.get('callbackUrl')
        user = CustomUser.objects.get(id=request.user.id)
        if user.is_schoology_authenticated:
            return Response({"Already Authorized With Schoology": "No more Auth"}, status=HTTP_204_NO_CONTENT)
        request_url = auth.request_authorization(
            callback_url=callback)
        return Response({'authUrl': request_url}, status=HTTP_200_OK)

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        if user.is_schoology_authenticated:
            return Response({"Already Authorized With Schoology": "No more Auth"}, status=HTTP_204_NO_CONTENT)
        auth.authorize()
        auth.oauth.token = {'oauth_token': auth.access_token,
                            'oauth_token_secret': auth.access_token_secret}
        schoology_tokens = SchoologyToken()
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
        tokens = SchoologyToken.objects.get(user_id=user_id)
    except:
        return Response({'Unauthorized': 'Please Authorize with Schoology'}, status=HTTP_401_UNAUTHORIZED)
    access_token = tokens.access_token
    access_secret = tokens.access_secret
    schoologyauth = schoolopy.Auth(CONSUMER_KEY, CONSUMER_SECRET,
                                   three_legged=True, access_token=access_token, access_token_secret=access_secret)
    schoologyauth.oauth.token = {
        'oauth_token': access_token, 'oauth_token_secret': access_secret}
    sc = schoolopy.Schoology(schoologyauth)
    return sc


class SchoologyCourses(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        user_schoology_course_ids = list(Course.objects.filter(
            user_id=user.id, is_schoology=True).values_list('schoology_section_id', flat=True))
        sc = getSchoologyTokens(user.id)
        schoology_courses = sc.get_user_sections(user_id=user.schoology_id)
        schoology_ids = []
        for i in range(len(schoology_courses)):
            schoology_ids.append(schoology_courses[i]['id'])
        for i in range(len(schoology_courses)):
            if schoology_courses[i]['id'] not in user_schoology_course_ids:
                course = Course()
                course.user_id = user.id
                course.name = schoology_courses[i]['course_title']
                course.schoology_class_id = schoology_courses[i]['course_id']
                course.schoology_section_id = schoology_courses[i]['id']
                course.subject = mapSchoologyCourseSubject(
                    schoology_courses[i]['subject_area'])
                meeting_days = schoology_courses[i]['meeting_days']
                course.is_schoology = True
                course.save()
                addMeetingDays(course.id, meeting_days)
        for id in user_schoology_course_ids:
            course = Course.objects.get(
                user_id=user.id, schoology_section_id=id)
            if id not in schoology_ids:
                course.is_active = False
                course.save(update_fields=['is_active'])
            if id in schoology_ids:
                course.is_active = True
                course.save(update_fields=['is_active'])
        return Response({'Success': "New Courses Added"}, status=HTTP_200_OK)


def addMeetingDays(course_id, meeting_days):
    for day in meeting_days:
        name_of_day = None
        if day == '0':
            name_of_day = "Sunday"
        if day == '1':
            name_of_day = "Monday"
        if day == '2':
            name_of_day = "Tuesday"
        if day == '3':
            name_of_day = "Wednesday"
        if day == '4':
            name_of_day = "Thursday"
        if day == '5':
            name_of_day = "Friday"
        if day == '6':
            name_of_day = "Saturday"
        course_meetings_day = CourseMeetingDay()
        course_meetings_day.course_id = course_id
        course_meetings_day.meeting_day = name_of_day
        course_meetings_day.save()


def mapSchoologyCourseSubject(subject):
    if subject == "0":
        return "Other"
    if subject == "1":
        return "Health & Physical Education"
    if subject == "2":
        return "Langauge Arts"
    if subject == "3":
        return "Mathematics"
    if subject == "4":
        return "Professional Development"
    if subject == "5":
        return "Science"
    if subject == "6":
        return "Social Studies"
    if subject == "7":
        return "Special Education"
    if subject == "8":
        return "Technology"
    if subject == "9":
        return "Arts"


class SchoologyGrades(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        sc = getSchoologyTokens(user.id)
        schoology_courses_ids = list(Course.objects.filter(
            user_id=user.id, is_schoology=True, is_active=True).values_list('schoology_section_id', flat=True))
        for i in range(len(schoology_courses_ids)):
            section_id = sc.get_user_grades(user.schoology_id)[
                i]['section_id']
            if section_id not in schoology_courses_ids:
                break
            course = Course.objects.get(
                user_id=user.id, schoology_section_id=section_id)
            course.grade = sc.get_user_grades(user.schoology_id)[
                i]['final_grade'][1]['grade']
            course.save(update_fields=['grade'])
        return Response({"Success": "Works"}, status=HTTP_200_OK)


class SchoologyAssignments(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

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


class GoogleCalendar(APIView):
    pass
