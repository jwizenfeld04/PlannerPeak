from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import CourseSerializer, AssignmentSerializer, SchoologyCallbackSerializer
from api.models import Course, Assignment, CustomUser, SchoologyToken, CourseMeetingDay
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime, timedelta

class GoogleCalendar(APIView):
    pass
