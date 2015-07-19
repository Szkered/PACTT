# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0006_auto_20150714_0247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testresult',
            name='comment',
            field=models.CharField(max_length=100, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='testresult',
            name='status',
            field=models.CharField(default=b'N', max_length=1, choices=[(b'C', b'Completed with No Issue'), (b'I', b'Completed with Issue'), (b'N', b'Not Yet Started'), (b'F', b'Failed')]),
            preserve_default=True,
        ),
    ]
