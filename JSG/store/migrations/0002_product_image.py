# Generated by Django 5.0.3 on 2024-04-05 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.CharField(default='/static/assets/johnsonLogo.png', max_length=255),
        ),
    ]
