from .models import Course, Assignment, CustomUser
from rest_framework import serializers
from django.db import transaction
from dj_rest_auth.registration.serializers import RegisterSerializer
from .choices import SCHOOL_CHOICES, YEAR_CHOICES


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
    class Meta:
        model = Course
        fields = ['id', 'user', 'name', 'subject', 'grade',
                  'schoology_class_id', 'schoology_section_id', 'is_schoology', 'color', 'priority', 'notifications']
        extra_kwargs = {
            'user': {'required': False},
            'grade': {'required': False},
            'schoology_class_id': {'required': False},
            'schoology_section_id': {'required': False},
        }


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'name', 'description', 'start_date',
                  'due_date', 'grade', 'schoology_assignment_id', 'is_schoology']
        extra_kwargs = {
            'grade': {'required': False},
            'schoology_assignment_id': {'required': False},
            'course': {'required': False},
            'start_date': {'required': False},
            'description': {'required': False},
        }


class SchoologyCallbackSerializer(serializers.Serializer):
    callbackUrl = serializers.CharField(max_length=50)
