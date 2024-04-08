from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class RegistrationForm(UserCreationForm):
    first_name = forms.CharField(max_length=255, help_text="Required")
    last_name = forms.CharField(max_length=255, help_text="Required")
    email = forms.EmailField(
        max_length=255,
        help_text="Required: Enter a email in the format example@example.com",
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "password1",
            "password2",
        )

    def clean_email(self):
        formEmail = self.cleaned_data.get("email")
        if User.objects.filter(email=formEmail.lower()).exists():
            raise ValidationError("An account is already registered with that email.")
        return formEmail.lower()

    def clean_username(self):
        formUsername = self.cleaned_data.get("username")
        if User.objects.filter(username=formUsername.lower()).exists():
            raise ValidationError("A user with that username already exists.")
        return formUsername.lower()
