from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Product
from .forms import RegistrationForm
from django.contrib.auth.models import Group
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate


def index(request):
    products = Product.objects.all().values()
    return render(request, "index.html", {"products": products})


def cart(request):
    return render(request, "cart.html")


def orderConfirmation(request):
    return render(request, "orderConfirmation.html")


def login(request):
    if request.method == "POST":
        copyRequest = request.POST.copy()
        copyRequest["username"] = copyRequest["username"].lower()
        form = AuthenticationForm(data=copyRequest)
        if form.is_valid():
            formUsername = form.cleaned_data.get("username")
            formPassword = form.cleaned_data.get("password")
            user = authenticate(request, username=formUsername, password=formPassword)
            if user is not None:
                auth_login(request, user)
                return redirect("index")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {"form": form})


def register(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            groupID = Group.objects.get(name="Customer")
            user = form.save()
            groupID.user_set.add(user)
            auth_login(request, user)
            return redirect("index")
    else:
        form = RegistrationForm()
    return render(request, "register.html", {"form": form})


def logout(request):
    if request.method == "POST":
        auth_logout(request)
        return redirect("index")
