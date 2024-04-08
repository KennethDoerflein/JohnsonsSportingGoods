import re
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Product
from .forms import LoginForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate


def index(request):
    products = Product.objects.all().values()
    # template = loader.get_template("index.html")
    # return HttpResponse(template.render(request, {"products": products}))
    return render(request, "index.html", {"products": products})


def cart(request):
    # template = loader.get_template("cart.html")
    # return HttpResponse(request, template.render())
    return render(request, "cart.html")


def orderConfirmation(request):
    # template = loader.get_template("orderConfirmation.html")
    # return HttpResponse(request, template.render())
    return render(request, "orderConfirmation.html")


def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect("index")
    form = {}
    form["form"] = LoginForm()
    return render(request, "login.html", form)


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            auth_login(request, form.save())
            return redirect("index")
    form = UserCreationForm()
    return render(request, "register.html", {"form": form})


def logout(request):
    if request.method == "POST":
        auth_logout(request)
        return redirect("index")
