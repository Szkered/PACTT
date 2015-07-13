# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0003_auto_20150707_0346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='app',
        ),
        migrations.AddField(
            model_name='assignment',
            name='scope',
            field=models.ForeignKey(default=1, to='planner.Scope'),
            preserve_default=False,
        ),
    ]
