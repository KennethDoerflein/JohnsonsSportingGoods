from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from datetime import date


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.IntegerField()
    image = models.CharField(
        max_length=255,
        default="/assets/johnsonLogo.png",
    )


class Cart(models.Model):
    CID = models.BigIntegerField()
    PID = models.BigIntegerField()
    qty = models.IntegerField()

class Order(models.Model):
    order_id = models.CharField(max_length=10, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shipping_address = models.CharField(max_length=100)
    billing_address = models.CharField(max_length=100)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateField(default=date.today)  
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    