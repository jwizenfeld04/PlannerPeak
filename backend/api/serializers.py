from .models import *
from rest_framework import serializers
from django.db import transaction
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer
from .choices import SCHOOL_CHOICES, YEAR_CHOICES
from .verify import send, check
from django.conf import settings


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'school_level',
                  'graduation_year', 'schoology_id', 'schoology_school', 'is_schoology_authenticated', 'phone', 'is_phone_verified']


class CustomRegisterSerializer(RegisterSerializer):
    phone = serializers.CharField(max_length=20, required=False)
    school_level = serializers.CharField(max_length=30, required=False)
    graduation_year = serializers.CharField(max_length=30, required=False)
    schoology_id = serializers.CharField(max_length=30, required=False)
    is_schoology_authenticated = serializers.BooleanField(default=False)
    username = None

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        CustomUser = super().save(request)
        CustomUser.phone = self.data.get('phone')
        CustomUser.school_level = self.data.get('school_level')
        CustomUser.graduation_year = self.data.get('graduation_year')
        CustomUser.schoology_id = self.data.get('schoology_id')
        CustomUser.is_schoology_authenticated = self.data.get(
            'is_schoology_authenticated')
        CustomUser.save()
        send(CustomUser.phone)
        return CustomUser


class CustomPasswordResetSerializer(PasswordResetSerializer):
    pass
# FIX EVENTUALLY


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'user', 'name', 'subject', 'grade',
                  'schoology_class_id', 'schoology_section_id', 'is_schoology', 'color', 'priority', 'notifications', 'number_of_assignments', 'avg_assignment_minutes']
        extra_kwargs = {
            'user': {'required': False},
            'grade': {'required': False},
            'schoology_class_id': {'required': False},
            'schoology_section_id': {'required': False},
            'name': {'required': False},
            'subject': {'required': False},
            'color': {'required': False},
            'priority': {'required': False},
            'notifications': {'required': False},
            'is_schoology': {'required': False},
            'number_of_assignments': {'required': False, "allow_null": True},
            'avg_assignment_minutes': {'required': False, "allow_null": True},
        }


class CourseMeetingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMeetingDay
        fields = ['id', 'course', 'meeting_day']
        extra_kwargs = {
            'course': {'required': False},
            'meeting_day': {'required': False}
        }


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'name', 'description', 'start_date',
                  'due_date', 'grade', 'schoology_assignment_id', 'is_schoology', 'is_completed', 'completed_date', 'max_points']
        extra_kwargs = {
            'course': {'required': False},
            'name': {'required': False},
            'grade': {'required': False},
            'schoology_assignment_id': {'required': False},
            'is_schoology': {'required': False},
            'is_completed': {'required': False},
            'course': {'required': False},
            'completed_date': {'required': False},
            'start_date': {'required': False},
            'due_date': {'required': False},
            'description': {'required': False},
            'max_points': {'required': False},
            'scheduled_start': {'required': False},
            'scheduled_finish': {'required': False},
        }


class AssignmentScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSchedule
        fields = '__all__'


class SchoologyCallbackSerializer(serializers.Serializer):
    callbackUrl = serializers.CharField(max_length=50)


class VerifyCodeSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=8)


# class IndividualTimeBlockSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = IndividualTimeBlock
#         fields = ['id', 'user', 'name', 'color', 'start_time',
#                   'end_time']
#         extra_kwargs = {
#             'user': {'required': False},
#             'name': {'required': False},
#             'color': {'required': False},
#             'start_time': {'required': False},
#             'end_time': {'required': False},
#         }


# class ActiveTimeBlockSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ActiveTimeBlock
#         fields = ['id', 'time_block', 'schedule_start', 'schedule_finish']
#         extra_kwargs = {
#             'time_block': {'required': False},
#             'schedule_start': {'required': False},
#             'schedule_finish': {'required': False},
#         }


# class RecurringTimeBlockSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RecurringTimeBlock
#         fields = ['id', 'user', 'name', 'color', 'is_time_recurring']
#         extra_kwargs = {
#             'user': {'required': False},
#             'name': {'required': False},
#             'color': {'required': False},
#             'is_time_recurring': {'required': False},
#         }


# class RecurringTimeBlockSettingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RecurringTimeBlockSetting
#         fields = ['id', 'time_block', 'day',
#                   'schedule_start', 'schedule_finish']
#         extra_kwargs = {
#             'time_block': {'required': False},
#             'schedule_start': {'required': False},
#             'schedule_finish': {'required': False},
#             'day': {'required': False},
#         }
