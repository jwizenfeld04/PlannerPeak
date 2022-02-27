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
    color = models.CharField(max_length=20, default="#B7D7EA")
    priority = models.IntegerField(default=1)
    notifications = models.BooleanField(default=True)

    def __str__(self):
        return self.name + " -- " + self.user.first_name + " " + self.user.last_name


class CourseMeetingDay(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    meeting_day = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.course.name + " on " + self.meeting_day


class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    grade = models.CharField(max_length=10, blank=True)
    max_points = models.IntegerField(blank=True, null=True)
    schoology_assignment_id = models.CharField(max_length=15, blank=True)
    assignment_type = models.CharField(max_length=20, blank=True)
    is_completed = models.BooleanField(default=False)
    is_schoology = models.BooleanField(default=False)
    scheduled_start = models.DateTimeField(blank=True, null=True)
    scheduled_finish = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name + " -- " + self.course.user.first_name + " " + self.course.user.last_name


class IndividualTimeBlock(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    color = models.CharField(max_length=20, default="yellow")
    start_time = models.TimeField(auto_now=False, auto_now_add=False)
    end_time = models.TimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.name + " Time Block"


class ActiveTimeBlock(models.Model):
    time_block = models.ForeignKey(
        IndividualTimeBlock, on_delete=models.CASCADE)
    schedule_start = models.DateTimeField()
    schedule_finish = models.DateTimeField()

    def __str__(self):
        return self.time_block.name + " Time Block At " + self.schedule_start


class RecurringTimeBlock(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    color = models.CharField(max_length=20, default="yellow")
    is_time_recurring = models.BooleanField(default=True)

    def __str__(self):
        return self.name + " Recurring Time Block"


class RecurringTimeBlockSetting(models.Model):
    time_block = models.ForeignKey(
        RecurringTimeBlock, on_delete=models.CASCADE)
    day = models.CharField(max_length=10)
    schedule_start = models.TimeField(auto_now=False, auto_now_add=False)
    schedule_finish = models.TimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.time_block.name + " Recurring At " + self.schedule_start


class SchoologyToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=100)
    access_secret = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user}'s Schoology Tokens"


class GoogleCalendarToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    refresh_token = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user}'s Google Calendar Tokens"
