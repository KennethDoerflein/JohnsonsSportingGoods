# Generated by Django 5.0.3 on 2024-04-08 04:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_cart_customer'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Customer',
        ),
    ]