from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from .choices import SCHOOL_CHOICES, YEAR_CHOICES


class SchoologySchools(models.Model):
    name = models.CharField(max_length=50)
    schoology_id = models.CharField(max_length=15)
    # School's schoology url: https://yula.schoology.org
    domain = models.URLField(max_length=200)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    school_level = models.CharField(
        max_length=1, choices=SCHOOL_CHOICES, blank=True, null=True)
    graduation_year = models.CharField(
        max_length=2, choices=YEAR_CHOICES, blank=True, null=True)
    username = None
    schoology_id = models.CharField(max_length=12, blank=True, null=True)
    schoology_school = models.ForeignKey(
        SchoologySchools, on_delete=models.SET_NULL, null=True, blank=True)
    is_schoology_authenticated = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.first_name + " " + self.last_name


class Course(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    subject = models.CharField(max_length=30)
    schoology_class_id = models.CharField(max_length=30, blank=True)
    grade = models.CharField(max_length=10, blank=True)
    schoology_section_id = models.CharField(max_length=15, blank=True)
    is_schoology = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name + " -- " + self.user.first_name + " " + self.user.last_name


class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    grade = models.CharField(max_length=10, blank=True)
    schoology_assignment_id = models.CharField(max_length=15, blank=True)
    assignment_type = models.CharField(max_length=20, blank=True)
    is_completed = models.BooleanField(default=False)
    is_schoology = models.BooleanField(default=False)

    def __str__(self):
        return self.name + " -- " + self.course.user.first_name + " " + self.course.user.last_name


# TODO: Make user only allowed to have one SchoologyTokens entry

class SchoologyTokens(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=100)
    access_secret = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user}'s Schoology Tokens"
