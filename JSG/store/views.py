from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
    testCardAmt = range(11)
    template = loader.get_template("index.html")
    return HttpResponse(template.render({"testCardAmt": testCardAmt}))


def cart(request):
    template = loader.get_template("cart.html")
    return HttpResponse(template.render())
