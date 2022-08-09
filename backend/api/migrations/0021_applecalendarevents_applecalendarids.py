# Generated by Django 3.0.6 on 2022-08-08 01:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_auto_20220628_0305'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppleCalendarIds',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calendar_id', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AppleCalendarEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_id', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('all_day', models.BooleanField()),
                ('notes', models.TextField(max_length=100)),
                ('organizer', models.CharField(max_length=100)),
                ('timezone', models.CharField(max_length=40)),
                ('url', models.CharField(max_length=100)),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.AppleCalendarIds')),
            ],
        ),
    ]