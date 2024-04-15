from django.shortcuts import render, redirect
from .models import Product, Cart
from .forms import RegistrationForm, LoginForm
from django.contrib.auth.models import Group, User
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.http import JsonResponse
from datetime import date


def index(request):
    products = Product.objects.all().values()
    return render(request, "index.html", {"products": products})


def cart(request):
    return render(request, "cart.html")


def orderConfirmation(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            form = request.POST
            orderForm = {
                "shippingAddr": form.get("shipping_addr"),
                "recipient": form.get("recipient"),
                "billingAddr": form.get("billing_addr"),
                "billingName": form.get("billing_name"),
                "date": date.today(),
            }

            userID = request.user.id
            cart_items = Cart.objects.filter(CID=userID)
            orderDetails = {}
            for item in cart_items:
                currentProduct = Product.objects.get(PID=item.PID)
                orderDetails += {
                    "name": currentProduct.name,
                    "price": currentProduct.price,
                    "qty": item.qty,
                    "subtotal": currentProduct.price * item.qty,
                }
                newQty = currentProduct.quantity - item.qty
                if newQty >= 0:
                    currentProduct.quantity = newQty
                    currentProduct.save()
                    item.delete()

            return render(
                request,
                "orderConfirmation.html",
                {"order_details": orderDetails, "order_form": orderForm},
            )
    return render(request, "orderConfirmation.html")


def login(request):
    if request.method == "POST":
        form = LoginForm(data=request.POST)
        if form.is_valid():
            formUsername = form.cleaned_data.get("username")
            formPassword = form.cleaned_data.get("password")
            user = authenticate(request, username=formUsername, password=formPassword)
            if user is not None:
                auth_login(request, user)
                return redirect("index")
    else:
        form = LoginForm()
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
        if request.user.is_authenticated:
            auth_logout(request)
            return redirect("index")


def checkTaken(request):
    if request.GET:
        username = request.GET.get("username")
        email = request.GET.get("email")
        if username is not None:
            if User.objects.filter(username=username.lower()).exists():
                return JsonResponse({"used": "true"})
            return JsonResponse({"used": "false"})
        elif email is not None:
            if User.objects.filter(email=email.lower()).exists():
                return JsonResponse({"used": "true"})
            return JsonResponse({"used": "false"})
