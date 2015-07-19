# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0007_auto_20150714_0258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testresult',
            name='endTime',
            field=models.TimeField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='testresult',
            name='startTime',
            field=models.TimeField(),
            preserve_default=True,
        ),
    ]
