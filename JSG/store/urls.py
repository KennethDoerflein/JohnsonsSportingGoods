from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("add_to_cart", views.add_to_cart, name="add_to_cart"),
    path("cart", views.cart, name="cart"),
    path("orderConfirmation", views.orderConfirmation, name="orderConfirmation"),
    path("login", views.login, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout, name="logout"),
]
