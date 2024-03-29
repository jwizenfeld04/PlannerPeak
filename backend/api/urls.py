from django.urls import path, register_converter
from django.urls.conf import include

from .views.taskViews import *
from .views.schoologyViews import *
from .views.courseViews import *
from .views.assignmentViews import *
from .views.scheduleViews import *
from .views.googleViews import *
from .views.timeBlockViews import *
from .views.verifyView import *
from dj_rest_auth.views import PasswordResetView
from .converters import DateConverter


register_converter(DateConverter, 'date')

urlpatterns = [
    path('verify-phone/',
         VerifyPhoneView.as_view(), name='verify_phone'),
    path('verify-resend/',
         ResendVerifyView.as_view(), name='verify_resend'),
    path('schedule-date/<date:date>/',
         SpecficDateSchedule.as_view(), name='date_schedule'),
    path('current-schedule/', CurrentSchedule.as_view(), name='current_schedule'),
    path('current-assignment/', CurrentAssignment.as_view(),
         name='current_assignment'),
    path('schedule-assignments/', ScheduleAssignments.as_view(),
         name='schedule_assignments'),
    path('schoology-assignments/', SchoologyAssignments.as_view(),
         name='schoology_assignments'),
    path('schoology-grades/', SchoologyGrades.as_view(), name='schoology_grades'),
    path('schoology-courses/', SchoologyCourses.as_view(),
         name='schoology_courses'),
    path('schoology-authorize/',
         SchoologyAuth.as_view(), name='schoology-authorize'),
    path('user-courses/', UserSpecificCourseView.as_view(), name="user_courses"),
    path('user-courses-update/<int:course_id>',
         UserSpecificCourseUpdateView.as_view(), name="user_courses_update"),
    path('user-assignments/', UserAssignmentView.as_view(), name="user_assignments"),
    path('user-assignments/<int:course_id>', UserSpecificAssignmentView.as_view(),
         name="user_assignments"),
    path('user-assignments-update/<int:assignment_id>', UserSpecificAssignmentUpdateView.as_view(),
         name="user_assignments_update"),
    path('login/', PhoneVerificationLoginView.as_view(), name='phone_verify_login'),
    path('password-reset/', PasswordResetView.as_view()),
    path('password-reset-confirm/<uidb64>/<token>/',
         CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset-done/', TemplateView.as_view(template_name='password_reset_done.html'),
         name='password_reset_done'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('create-task/', UserCreateTaskView.as_view(), name='create_task'),
    path('update-task/<int:task_id>',
         UserUpdateTaskView.as_view(), name='update_task'),
    path('user-history/', UserHistoryView.as_view(), name='history')
]
