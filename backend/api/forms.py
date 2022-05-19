from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from django import forms


class RegisterForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('email', 'graduation_year',
                  'school_level', 'schoology_id', 'phone')
