from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Product
from .forms import LoginForm


def index(request):
    products = Product.objects.all().values()
    template = loader.get_template("index.html")
    return HttpResponse(template.render({"products": products}))


def cart(request):
    template = loader.get_template("cart.html")
    return HttpResponse(template.render())


def orderConfirmation(request):
    template = loader.get_template("orderConfirmation.html")
    return HttpResponse(template.render())


def login(request):
    context = {}
    context["form"] = LoginForm()
    template = loader.get_template("login.html")
    return HttpResponse(template.render(context))
