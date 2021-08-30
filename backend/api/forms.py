from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser


class RegisterForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name',
                  'graduation_year', 'school_level', 'schoology_id')
