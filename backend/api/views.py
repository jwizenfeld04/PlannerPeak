from rest_framework import authentication
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .serializers import CourseSerializer, AssignmentSerializer, CustomUserSerializer, CustomRegisterSerializer
from .models import Course, Assignment, CustomUser, SchoologyTokens
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime
import schoolopy
import webbrowser as wb
from django.http import HttpResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer


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


class Schoology(APIView):
    def get(self, request, format=None):
        pass

    def put(self, request, format=None):
        pass


@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def SchoologyOpenUrlView(request):
    DOMAIN = 'https://app.schoology.com/'
    auth = schoolopy.Auth('74f43bf30d6895e48da903216442c45d060e18834', '06987ff5effb04457a21ffbeefff5106',
                          three_legged=True, domain=DOMAIN)
    callback = 'https://www.google.com'
    url = auth.request_authorization()
    request_token = auth.request_token
    request_secret = auth.request_token_secret
    token = auth.access_token
    print("Request Token:" + request_token)
    print("Request Secret:" + request_secret)
    return Response({'url': url}, status=HTTP_200_OK)

    # Before I press authorize
    # https://app.schoology.com//oauth/authorize?oauth_token=681888c4ea8e8100fe4acac9913bc8dc061189926&oauth_callback=https%3A%2F%2Fapp.schoology.com%2F
    # After I press authorize
    # https://app.schoology.com/?oauth_token=681888c4ea8e8100fe4acac9913bc8dc061189926


@api_view(('POST',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def SchoologyAuthorizeView(request):
    if request.data == True:
        DOMAIN = 'https://app.schoology.com/'
        auth = schoolopy.Auth('74f43bf30d6895e48da903216442c45d060e18834', '06987ff5effb04457a21ffbeefff5106',
                              three_legged=True, domain=DOMAIN)
        auth.authorize()
        tok = auth.access_token
        sec = auth.access_token_secret
        tokens = SchoologyTokens(user_id=request.user.id,
                                 access_token=tok, access_secret=sec)
        auth2 = schoolopy.Auth('74f43bf30d6895e48da903216442c45d060e18834', '06987ff5effb04457a21ffbeefff5106', three_legged=True,
                               domain=DOMAIN, access_token=tokens.access_token, access_token_secret=tokens.access_secret)
        auth2.oauth.token = {'oauth_token': tokens.access_token,
                             'oauth_token_secret': tokens.access_secret}
        sc = schoolopy.Schoology(auth)
        user = CustomUser.objects.get(id=request.user.id)
        user.is_schoology_authenticated = True
        user.save(update_fields=['is_schoology_authenticated'])
        print('Your name is %s' % sc.get_me().name_display)
        id = sc.get_me().id
        return Response({'id': id}, status=HTTP_200_OK)
    return Response({"Error": "Invalid Schoology Authorization"}, status=HTTP_401_UNAUTHORIZED)


# Maybe make a class and use self on the auth instance so it is the same auth and make the class an API View
# Is their an Oauth Verifier I need in between the request_authorization and the authorize instances
# Test Commit2
