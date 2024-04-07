import os
from django.conf import settings
from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.IntegerField()
    image = models.CharField(
        max_length=255,
        default="/static/assets/johnsonLogo.png",
    )


class Customer(models.Model):
    fName = models.CharField(max_length=255)
    lName = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)


class Cart(models.Model):
    CID = models.BigIntegerField()
    PID = models.BigIntegerField()
    qty = models.IntegerField()
    password = models.CharField(max_length=255)
