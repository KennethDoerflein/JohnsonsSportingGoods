from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Product, Cart
from django.db.models import Sum
from .forms import RegistrationForm, LoginForm
from django.contrib.auth.models import Group
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate


def index(request):
    products = Product.objects.all().values()
    cart_count = Cart.objects.filter(CID=request.user.id).aggregate(Sum('qty'))['qty__sum'] or 0

    context = {
        'products': products,
        'cart_count': cart_count,
    }

    return render(request, "index.html", context)


def cart(request):
    cart_count = Cart.objects.filter(CID=request.user.id).aggregate(Sum('qty'))['qty__sum'] or 0
    cart_items = Cart.objects.filter(CID=request.user.id)

    cart_items_with_product_details = []
    total_cost = 0
    for cart_item in cart_items:
        product = Product.objects.get(id=cart_item.PID)
        total_cost += product.price * cart_item.qty
        cart_item_with_product_details = {
            'name': product.name,
            'price': product.price * cart_item.qty,
            'qty': cart_item.qty
        }
        cart_items_with_product_details.append(cart_item_with_product_details)

    context = {
        'cart_count': cart_count,
        'cart_items': cart_items_with_product_details,
        'total_cost': total_cost
    }

    return render(request, "cart.html", context)


def orderConfirmation(request):
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
        auth_logout(request)
        return redirect("index")

def add_to_cart(request):
    if request.method == 'POST':
        customer_id = request.POST.get('customer_id')
        product_id = request.POST.get('product_id')
        quantity = request.POST.get('quantity')

        Cart.objects.create(CID=customer_id, PID=product_id, qty=quantity)

        return redirect('index')