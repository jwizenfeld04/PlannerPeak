from django.urls import path
from django.urls.conf import include
from views.schoologyViews import *
from views.courseViews import *
from views.assignmentViews import *
from views.scheduleViews import *
from views.googleCalendarViews import *


urlpatterns = [
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
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

]
