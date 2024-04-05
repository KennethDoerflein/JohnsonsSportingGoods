import os
from django.conf import settings
from django.db import models

# Create your models here.


def images_path():
    # this may not be right
    return os.path.join(settings.LOCAL_FILE_DIR, "/static/assets/")


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.IntegerField()
    image = models.FilePathField(
        path=images_path,
        default="/static/assets/johnsonLogo.png",
    )
