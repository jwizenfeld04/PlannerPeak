from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, Group
from .forms import RegisterForm
from .models import *
from django.contrib.admin import SimpleListFilter
import csv


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = RegisterForm
    list_display = ('email', 'phone', 'is_phone_verified',
                    'schoology_id', 'is_schoology_authenticated', 'graduation_year', 'school_level')
    list_filter = ('school_level', 'graduation_year',
                   'is_active', 'is_phone_verified', 'is_staff', 'is_superuser',)
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


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'grade', 'priority',
                    'is_schoology', 'is_active', 'user')
    list_filter = ('user', 'subject',
                   'priority', GradeFilter, 'is_schoology', 'is_active')
    ordering = ('is_active', 'grade', 'priority')
    search_fields = ('name', 'subject')


def download_assignment_csv(modeladmin, request, queryset):
    f = open('assignment_data.csv', 'w')
    writer = csv.writer(f)
    writer.writerow(["name", "assignment_type", "course",
                    "grade", 'total_study_minutes', "start_date", "due_date"])
    for s in queryset:
        writer.writerow([s.name, s.assignment_type, s.course,
                        s.grade, s.total_study_minutes, s.start_date, s.due_date])


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'assignment_type', 'course', 'grade', 'total_study_minutes', 'start_date',
                    'due_date', 'is_completed', 'is_schoology', )
    readonly_fields = ('total_study_minutes',)
    list_filter = ('assignment_type', GradeFilter,
                   'start_date', 'due_date', 'is_schoology', 'is_completed')
    ordering = ('assignment_type', 'grade', 'start_date',
                'due_date', 'is_completed', 'is_schoology')
    search_fields = ('name', 'course')
    actions = [download_assignment_csv]

    def total_study_minutes(self, obj):
        return obj.total_study_minutes()


@admin.register(AssignmentSchedule)
class AssignmentScheduleAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'scheduled_start', 'scheduled_finish')
    list_filter = ('assignment', 'scheduled_start', 'scheduled_finish')
    ordering = ('scheduled_start', 'scheduled_finish')


admin.site.unregister(Group)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(SchoologyToken)
admin.site.register(CourseMeetingDay)
# admin.site.register(IndividualTimeBlock)
# admin.site.register(ActiveTimeBlocks)
# admin.site.register(RecurringTimeBlocks)
# admin.site.register(RecurringTimeBlockSettings)
