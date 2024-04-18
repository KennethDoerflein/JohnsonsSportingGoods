from django.shortcuts import render, redirect
from .models import Product, Cart,Order, OrderItem
from django.db.models import Sum
from .forms import RegistrationForm, LoginForm
from django.contrib.auth.models import Group, User
from django.contrib.auth import (
    login as auth_login,
    logout as auth_logout,
    authenticate,
    update_session_auth_hash,
)
from django.http import JsonResponse
from datetime import date
from django.contrib.auth.forms import PasswordChangeForm
import uuid



def navbar_cart_count(request):
    cart_count = (
        Cart.objects.filter(CID=request.user.id).aggregate(Sum("qty"))["qty__sum"] or 0
    )
    if cart_count > 99:
        cart_count = "99+"
    return {"cart_count": cart_count}


def index(request):
    products = Product.objects.all().values()
    return render(request, "index.html", {"products": products})


def cart(request):
    cart_items = Cart.objects.filter(CID=request.user.id)

    cart_items_with_product_details = []
    total_cost = 0
    for cart_item in cart_items:
        product = Product.objects.get(id=cart_item.PID)
        total_cost += product.price * cart_item.qty
        cart_item_with_product_details = {
            "image": product.image,
            "name": product.name,
            "price": product.price,
            "qty": cart_item.qty,
            "subtotal": product.price * cart_item.qty,
        }
        cart_items_with_product_details.append(cart_item_with_product_details)

    context = {"cart_items": cart_items_with_product_details, "total_cost": total_cost}

    return render(request, "cart.html", context)


def orderConfirmation(request):
    if request.method == "POST" and request.user.is_authenticated:
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
        if not cart_items.exists():
            return redirect("cart")
        orderDetails = []
        total_cost = 0
        for item in cart_items:
            currentProduct = Product.objects.get(id=item.PID)
            orderDetails.append(
                {
                    "image": currentProduct.image,
                    "name": currentProduct.name,
                    "price": currentProduct.price,
                    "qty": item.qty,
                    "subtotal": currentProduct.price * item.qty,
                }
            )
            total_cost += currentProduct.price * item.qty
            newQty = currentProduct.quantity - item.qty
            if newQty >= 0:
                currentProduct.quantity = newQty
                currentProduct.save()
                item.delete()
        
       
        default_order_id = uuid.uuid4().hex[:10].upper()
        new_order = Order.objects.create(
            user=request.user,
            shipping_address=orderForm["shippingAddr"],
            billing_address=orderForm["billingAddr"],
            total_cost=total_cost,
        )

        for item in cart_items:
            product = Product.objects.get(id=item.PID)
            OrderItem.objects.create(
                order=new_order,
                product=product,
                quantity=item.qty
            )


        return render(
            request,
            "orderConfirmation.html",
            {"order_details": orderDetails, "order_form": orderForm},
        )
    return redirect("cart")


def login(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            form = LoginForm(data=request.POST)
            if form.is_valid():
                formUsername = form.cleaned_data.get("username")
                formPassword = form.cleaned_data.get("password")
                user = authenticate(
                    request, username=formUsername, password=formPassword
                )
                if user is not None:
                    auth_login(request, user)
                    return redirect("index")
        else:
            form = LoginForm()
    else:
        return redirect("/")  # change to account page when its done
    return render(request, "login.html", {"form": form})


def register(request):
    if not request.user.is_authenticated:
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
    else:
        return redirect("/")  # change to account page when its done
    return render(request, "register.html", {"form": form})


def logout(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            auth_logout(request)
            return redirect("index")


def add_to_cart(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            customer_id = request.POST.get("customer_id")
            product_id = request.POST.get("product_id")
            quantity = int(request.POST.get("quantity"))
            in_stock = Product.objects.get(id=product_id).quantity
            if quantity > in_stock:
                quantity = in_stock
            if quantity > 0:
                if Cart.objects.filter(CID=customer_id, PID=product_id).exists():
                    item = Cart.objects.get(CID=customer_id, PID=product_id)
                    item.qty = item.qty + quantity
                    if item.qty > in_stock:
                        item.qty = in_stock
                    item.save()
                else:
                    Cart.objects.create(CID=customer_id, PID=product_id, qty=quantity)
        else:
            return redirect("login")
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


def account(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            form = PasswordChangeForm(user=request.user, data=request.POST)
            if form.is_valid():
                form.save()
                update_session_auth_hash(request, form.user)
                return redirect("index")
        else:
            form = PasswordChangeForm(user=request.user)
    else:
        return redirect("/")  # change to account page when its done
    return render(request, "account.html", {"form": form})
