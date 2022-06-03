from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, Group
from .forms import RegisterForm
from .models import *


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = RegisterForm
    list_display = ('email',
                    'graduation_year', 'school_level')
    list_filter = ('school_level', 'graduation_year',
                   'is_active', 'is_staff', 'is_superuser',)
    fieldsets = (
        ('Account Information', {
            'classes': ('wide',),
            'fields': ('phone',
                       'is_phone_verified',
                       'email',
                       'password',)}),
        ('School Information', {
         'fields': ('graduation_year', 'school_level', 'schoology_id', 'is_schoology_authenticated')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        ('Account Information', {
            'fields': ('phone',
                       'email',
                       'password1',
                       'password2',)}),
        ('School Information', {
         'fields': ('graduation_year', 'school_level', 'schoology_id', 'is_schoology_authenticated')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    search_fields = ('email', 'phone')
    ordering = ('email',)


admin.site.unregister(Group)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Course)
admin.site.register(Assignment)
admin.site.register(SchoologyToken)
admin.site.register(CourseMeetingDay)
admin.site.register(AssignmentSchedule)
# admin.site.register(IndividualTimeBlock)
# admin.site.register(ActiveTimeBlocks)
# admin.site.register(RecurringTimeBlocks)
# admin.site.register(RecurringTimeBlockSettings)
