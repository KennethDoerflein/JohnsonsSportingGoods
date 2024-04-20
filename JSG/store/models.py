from django.db import models


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
