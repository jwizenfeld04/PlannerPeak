from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import AssignmentSerializer
from api.models import Course, Assignment, AssignmentSchedule
from rest_framework.response import Response
from rest_framework.status import *
from datetime import datetime, timezone



class AlgoScan(APIView):
    serializer_class = AssignmentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
       pass