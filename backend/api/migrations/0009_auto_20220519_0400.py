# Generated by Django 3.0.6 on 2022-05-19 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20220518_2004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
