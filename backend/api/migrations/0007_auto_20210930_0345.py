# Generated by Django 3.0.6 on 2021-09-30 03:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_assignment_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='assignment',
            old_name='type',
            new_name='assignment_type',
        ),
    ]
