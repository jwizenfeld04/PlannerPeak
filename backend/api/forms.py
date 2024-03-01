from dataclasses import fields
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser, Course
from django import forms


class RegisterForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('email', 'graduation_year',
                  'school_level', 'schoology_id', 'phone')


class CourseForm(forms.ModelForm):

    deleted = forms.DateTimeField()

    def save(self, commit=True):
        deleted = self.cleaned_data.get('deleted', None)
        # ...do something with extra_field here...
        return super(CourseForm, self).save(commit=commit)

    class Meta:
        model = Course
        fields = '__all__'


class ResetPasswordForm(forms.Form):
    new_password1 = forms.CharField(label="New password")
    new_password2 = forms.CharField(label="Confirm New password")
