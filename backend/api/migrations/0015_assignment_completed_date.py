# Generated by Django 3.0.6 on 2022-06-23 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20220622_2043'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='completed_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
