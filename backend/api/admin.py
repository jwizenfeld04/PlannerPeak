from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, Group
from .forms import RegisterForm, CourseForm
from .models import *
from django.contrib.admin import SimpleListFilter
import csv
from safedelete.admin import SafeDeleteAdmin, SafeDeleteAdminFilter
from safedelete.models import HARD_DELETE

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = RegisterForm
    list_display = ('email', 'phone', 'verified',
                    'schoology_id', 'is_schoology_authenticated','is_apple_calendar_authenticated', 'graduation_year', 'school_level')
    list_filter = ('school_level', 'graduation_year',
                   'is_active', 'verified', 'is_staff', 'is_superuser',)
    fieldsets = (
        ('Account Information', {
            'classes': ('wide',),
            'fields': ('phone',
                       'verified',
                       'email',
                       'password',)}),
        ('School Information', {
         'fields': ('graduation_year', 'school_level', 'schoology_id', 'is_schoology_authenticated','is_apple_calendar_authenticated')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        ('Account Information', {
            'fields': ('phone',
                       'email',
                       'password1',
                       'password2',)}),
        ('School Information', {
         'fields': ('graduation_year', 'school_level', 'schoology_id', 'is_schoology_authenticated','is_apple_calendar_authenticated')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    search_fields = ('email', 'phone')
    ordering = ('email',)


class GradeFilter(SimpleListFilter):
    title = 'grade'
    parameter_name = 'grade'

    def lookups(self, request, model_admin):
        return (
            ('90-100', '90-100'),
            ('80-89', '80-89'),
            ('70-79', '70-79'),
            ('60-69', '60-69'),
            ('<60', '<60'),
        )

    def queryset(self, request, queryset):
        if self.value() == '90-100':
            return queryset.filter(grade__range=(90, 100))
        if self.value() == '80-89':
            return queryset.filter(grade__range=(80, 89))
        if self.value() == '70-79':
            return queryset.filter(grade__range=(70, 79))
        if self.value() == '60-69':
            return queryset.filter(grade__range=(60, 69))
        if self.value() == '<60':
            return queryset.filter(grade__range=(0, 59))

def restore(modeladmin, request, queryset):
    for s in queryset:
        s.undelete()

def hard_delete(modeladmin, request, queryset):
    for s in queryset:
        s.delete(force_policy=HARD_DELETE)


@admin.register(Course)
class CourseAdmin(SafeDeleteAdmin):
    list_display = ('name', 'subject', 'grade', 'priority',
                    'is_schoology', 'user','avg_assignment_minutes', 'number_of_assignments') + SafeDeleteAdmin.list_display
    readonly_fields = ('avg_assignment_minutes',)
    list_filter = ('user', 'subject',
                   'priority', GradeFilter, 'is_schoology', SafeDeleteAdminFilter) + SafeDeleteAdmin.list_filter
    ordering = ('grade', 'priority')
    search_fields = ('name', 'subject')
    actions = [restore, hard_delete]





def download_assignment_csv(modeladmin, request, queryset):
    f = open('assignment_data.csv', 'w')
    writer = csv.writer(f)
    writer.writerow(["name", "assignment_type", "course",
                    "grade", 'total_study_minutes', "start_date", "due_date"])
    for s in queryset:
        writer.writerow([s.name, s.assignment_type, s.course,
                        s.grade, s.total_study_minutes(), s.start_date, s.due_date])

def incomplete(modeladmin, request, queryset):
    for s in queryset:
        s.is_completed = False
        s.completed_date = None
        s.save(update_fields=['is_completed','completed_date'])


@admin.register(Assignment)
class AssignmentAdmin(SafeDeleteAdmin):
    list_display = ('name', 'assignment_type', 'course', 'grade', 'total_study_minutes', 'start_date',
                    'due_date', 'is_completed', 'completed_date', 'is_schoology','deleted','deleted_by_cascade') 
    readonly_fields = ('total_study_minutes',)
    list_filter = ('assignment_type', GradeFilter,
                   'start_date', 'due_date', 'is_schoology', 'is_completed', SafeDeleteAdminFilter) + SafeDeleteAdmin.list_filter
    ordering = ('assignment_type', 'grade', 'start_date',
                'due_date', 'is_completed', 'is_schoology')
    search_fields = ('name', 'course')
    actions = [download_assignment_csv, restore, incomplete, hard_delete]

    def total_study_minutes(self, obj):
        return obj.total_study_minutes()


@admin.register(AssignmentSchedule)
class AssignmentScheduleAdmin(SafeDeleteAdmin):
    list_display = ('assignment', 'scheduled_start', 'scheduled_finish','total_time', 'deleted','deleted_by_cascade')  
    list_filter = ('assignment', 'scheduled_start', 'scheduled_finish', SafeDeleteAdminFilter) + SafeDeleteAdmin.list_filter
    ordering = ('scheduled_start', 'scheduled_finish')
    actions = [restore]

@admin.register(CourseMeetingDay)
class CourseMeetingDayAdmin(SafeDeleteAdmin):
    list_display = ('course','meeting_day', 'deleted','deleted_by_cascade')  
    list_filter = ('course','meeting_day', SafeDeleteAdminFilter) + SafeDeleteAdmin.list_filter
    actions = [restore]

@admin.register(SchoologyToken)
class SchoologyTokenAdmin(admin.ModelAdmin):
    list_display = ('user','access_token', 'access_secret','created_date')  


admin.site.unregister(Group)
admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(IndividualTimeBlock)
# admin.site.register(ActiveTimeBlocks)
# admin.site.register(RecurringTimeBlocks)
# admin.site.register(RecurringTimeBlockSettings)
