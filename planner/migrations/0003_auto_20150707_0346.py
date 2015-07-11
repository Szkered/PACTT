# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0002_auto_20150630_1620'),
    ]

    operations = [
        migrations.AddField(
            model_name='scope',
            name='descope_reason',
            field=models.CharField(default='', max_length=50, blank=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='scope',
            name='scoped',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
