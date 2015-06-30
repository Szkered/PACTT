# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testphase',
            name='endTime',
            field=models.TimeField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='testphase',
            name='startTime',
            field=models.TimeField(),
            preserve_default=True,
        ),
    ]
