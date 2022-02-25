from .models import *
from rest_framework import serializers
from django.db import transaction
from dj_rest_auth.registration.serializers import RegisterSerializer
from .choices import SCHOOL_CHOICES, YEAR_CHOICES
from django.db.models import Count


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'school_level',
                  'graduation_year', 'schoology_id', 'schoology_school', 'is_schoology_authenticated']


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    school_level = serializers.CharField(max_length=30, required=False)
    graduation_year = serializers.CharField(max_length=30, required=False)
    schoology_id = serializers.CharField(max_length=30, required=False)
    is_schoology_authenticated = serializers.BooleanField(default=False)
    username = None

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        CustomUser = super().save(request)
        CustomUser.first_name = self.data.get('first_name')
        CustomUser.last_name = self.data.get('last_name')
        CustomUser.school_level = self.data.get('school_level')
        CustomUser.graduation_year = self.data.get('graduation_year')
        CustomUser.schoology_id = self.data.get('schoology_id')
        CustomUser.is_schoology_authenticated = self.data.get(
            'is_schoology_authenticated')
        CustomUser.save()
        return CustomUser


class CourseSerializer(serializers.ModelSerializer):
    number_of_assignments = serializers.SerializerMethodField('get_number_of_assignments')
    class Meta:
        model = Course
        fields = ['id', 'user', 'name', 'subject', 'grade',
                  'schoology_class_id', 'schoology_section_id', 'is_schoology', 'color', 'priority', 'notifications']
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
        }

    def get_number_of_assignments(self, obj):
        return Course.objects.annotate(number_of_assignments=Count('assignment'))



class CourseMeetingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMeetingDay
        fields = ['id', 'course', 'meeting_day']


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'name', 'description', 'start_date',
                  'due_date', 'grade', 'schoology_assignment_id', 'is_schoology', 'is_completed', 'max_points', 'scheduled_start', 'scheduled_finish']
        extra_kwargs = {
            'grade': {'required': False},
            'schoology_assignment_id': {'required': False},
            'course': {'required': False},
            'start_date': {'required': False},
            'description': {'required': False},
            'max_points': {'required': False},
            'scheduled_start': {'required': False},
            'scheduled_finish': {'required': False},
        }


class SchoologyCallbackSerializer(serializers.Serializer):
    callbackUrl = serializers.CharField(max_length=50)


class IndividualTimeBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualTimeBlock
        fields = ['id', 'user', 'name', 'color', 'start_time',
                  'end_time']
        extra_kwargs = {
            'user': {'required': False},
            'name': {'required': False},
            'color': {'required': False},
            'start_time': {'required': False},
            'end_time': {'required': False},
        }


class ActiveTimeBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveTimeBlock
        fields = ['id', 'time_block', 'schedule_start', 'schedule_finish']
        extra_kwargs = {
            'time_block': {'required': False},
            'schedule_start': {'required': False},
            'schedule_finish': {'required': False},
        }


class RecurringTimeBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringTimeBlock
        fields = ['id', 'user', 'name', 'color', 'is_time_recurring']
        extra_kwargs = {
            'user': {'required': False},
            'name': {'required': False},
            'color': {'required': False},
            'is_time_recurring': {'required': False},
        }


class RecurringTimeBlockSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringTimeBlockSetting
        fields = ['id', 'time_block', 'day',
                  'schedule_start', 'schedule_finish']
        extra_kwargs = {
            'time_block': {'required': False},
            'schedule_start': {'required': False},
            'schedule_finish': {'required': False},
            'day': {'required': False},
        }
