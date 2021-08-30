from django.urls import path
from django.urls.conf import include
from .views import UserSpecificCourseView, UserSpecificAssignmentView, UserSpecificCourseUpdateView, UserSpecificAssignmentUpdateView, SchoologyOpenUrlView, SchoologyAuthorizeView


urlpatterns = [
    path('schoology-authorize/',
         SchoologyAuthorizeView, name='schoology_authorize'),
    path('schoology-url/', SchoologyOpenUrlView, name='schoology_url'),
    path('user-courses/', UserSpecificCourseView.as_view(), name="user_courses"),
    path('user-courses-update/<int:course_id>',
         UserSpecificCourseUpdateView.as_view(), name="user_courses_update"),
    path('user-assignments/<int:course_id>', UserSpecificAssignmentView.as_view(),
         name="user_assignments"),
    path('user-assignments-update/<int:assignment_id>', UserSpecificAssignmentUpdateView.as_view(),
         name="user_assignments_update"),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

]
