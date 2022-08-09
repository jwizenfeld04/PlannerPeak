from datetime import datetime
from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomSafeDeleteManager, CustomUserManager
from .choices import SCHOOL_CHOICES, YEAR_CHOICES, COLOR_CHOICES
from safedelete.models import SafeDeleteModel, SOFT_DELETE_CASCADE
import random


class SchoologySchools(models.Model):
    name = models.CharField(max_length=50)
    schoology_id = models.CharField(max_length=15)
    # School's schoology url: https://yula.schoology.org
    domain = models.URLField(max_length=200)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(max_length=20, blank=False)
    verified = models.BooleanField(default=False)
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
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email



def assign_course_color():
    return random.choice(COLOR_CHOICES)

class Course(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    subject = models.CharField(max_length=30)
    schoology_class_id = models.CharField(max_length=30, blank=True)
    grade = models.CharField(max_length=10, blank=True)
    schoology_section_id = models.CharField(max_length=15, blank=True)
    is_schoology = models.BooleanField(default=False)
    color = models.CharField(max_length=20, default=assign_course_color)
    priority = models.IntegerField(default=1)
    notifications = models.BooleanField(default=True)

    #Queries soft deleted objects in filter queries
    objects = CustomSafeDeleteManager()

    def number_of_assignments(self):
        return Assignment.objects.filter(course_id=self.id, is_completed=False, deleted=None).count()

    def avg_assignment_minutes(self):
        assignments = Assignment.objects.filter(course_id=self.id)
        if len(assignments) == 0:
            return 0
        total_minutes = 0
        for assignment in assignments:
            total_minutes = total_minutes + assignment.total_study_minutes()
        return total_minutes / len(assignments)

        

    def __str__(self):
        return self.name


class CourseMeetingDay(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    meeting_day = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.course.name + " on " + self.meeting_day


class Assignment(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    grade = models.CharField(max_length=10, blank=True)
    max_points = models.IntegerField(blank=True, null=True)
    schoology_assignment_id = models.CharField(max_length=15, blank=True)
    assignment_type = models.CharField(max_length=20, blank=True)
    is_completed = models.BooleanField(default=False)
    completed_date = models.DateTimeField(blank=True, null=True)
    is_schoology = models.BooleanField(default=False)

    objects = CustomSafeDeleteManager()

    # TODO: Query the sum of total_time() method from AssignmentSchedule Model
    def total_study_minutes(self):
        schedules = AssignmentSchedule.objects.filter(assignment_id=self.id)
        minutes = 0
        for schedule in schedules:
            assignment_time = round((schedule.scheduled_finish -
                                     schedule.scheduled_start).total_seconds() / 60.0)
            minutes = minutes + assignment_time
        return minutes

    def update_completed_date(self):
        current_datetime = datetime.now()
        self.completed_date = current_datetime
        self.save(update_fields=['completed_date'])

    def __str__(self):
        return self.name


class AssignmentSchedule(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    scheduled_start = models.DateTimeField(blank=True, null=True)
    scheduled_finish = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.assignment.name + " Schedule Interval"

    def total_time(self):
        total_time = round((self.scheduled_finish - self.scheduled_start).total_seconds() / 60.0)
        return total_time

class AppleCalendarIds(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    calendar_id = models.CharField(max_length=100)

class AppleCalendarEvents(models.Model):
    calendar = models.ForeignKey(AppleCalendarIds, on_delete=models.CASCADE)
    event_id = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    all_day = models.BooleanField()
    notes = models.TextField(max_length=100)
    organizer = models.CharField(max_length=100)
    timezone = models.CharField(max_length=40)
    url = models.CharField(max_length=100)
    



# class IndividualTimeBlock(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     name = models.CharField(max_length=30)
#     color = models.CharField(max_length=20, default="yellow")
#     start_time = models.TimeField(auto_now=False, auto_now_add=False)
#     end_time = models.TimeField(auto_now=False, auto_now_add=False)

#     def __str__(self):
#         return self.name + " Time Block"


# class ActiveTimeBlock(models.Model):
#     time_block = models.ForeignKey(
#         IndividualTimeBlock, on_delete=models.CASCADE)
#     schedule_start = models.DateTimeField()
#     schedule_finish = models.DateTimeField()

#     def __str__(self):
#         return self.time_block.name + " Time Block At " + self.schedule_start


# class RecurringTimeBlock(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     name = models.CharField(max_length=30)
#     color = models.CharField(max_length=20, default="yellow")
#     is_time_recurring = models.BooleanField(default=True)

#     def __str__(self):
#         return self.name + " Recurring Time Block"


# class RecurringTimeBlockSetting(models.Model):
#     time_block = models.ForeignKey(
#         RecurringTimeBlock, on_delete=models.CASCADE)
#     day = models.CharField(max_length=10)
#     schedule_start = models.TimeField(auto_now=False, auto_now_add=False)
#     schedule_finish = models.TimeField(auto_now=False, auto_now_add=False)

#     def __str__(self):
#         return self.time_block.name + " Recurring At " + self.schedule_start


class SchoologyToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=100)
    access_secret = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}'s Schoology Tokens"


class GoogleCalendarToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    refresh_token = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user}'s Google Calendar Tokens"
