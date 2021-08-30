from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, Group
from .forms import RegisterForm
from .models import CustomUser, Course, Assignment


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = RegisterForm
    list_display = ('last_name', 'first_name', 'email',
                    'graduation_year', 'school_level')
    list_filter = ('school_level', 'graduation_year',
                   'is_active', 'is_staff', 'is_superuser',)
    fieldsets = (
        ('Account Information', {
            'classes': ('wide',),
            'fields': ('first_name',
                       'last_name',
                       'email',
                       'password',)}),
        ('School Information', {
         'fields': ('graduation_year', 'school_level', 'schoology_id')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        ('Account Information', {
            'fields': ('first_name',
                       'last_name',
                       'email',
                       'password1',
                       'password2',)}),
        ('School Information', {
         'fields': ('graduation_year', 'school_level', 'schoology_id')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    search_fields = ('email', 'last_name', 'first_name')
    ordering = ('email',)


admin.site.unregister(Group)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Course)
admin.site.register(Assignment)
