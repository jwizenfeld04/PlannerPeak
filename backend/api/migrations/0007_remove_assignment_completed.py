# Generated by Django 3.0.6 on 2022-02-03 02:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20220203_0031'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='completed',
        ),
    ]
