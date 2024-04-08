from django import forms


class LoginForm(forms.Form):
    email = forms.EmailField(
        max_length=255, widget=forms.TextInput(attrs={"class": "form-control my-2"})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control my-2"})
    )
