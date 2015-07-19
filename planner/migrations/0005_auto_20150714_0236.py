# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0004_auto_20150713_0527'),
    ]

    operations = [
        migrations.RenameField(
            model_name='testresult',
            old_name='TestPhase',
            new_name='testPhase',
        ),
        migrations.AlterField(
            model_name='testphase',
            name='lob',
            field=models.CharField(blank=True, max_length=1, choices=[(b'G', b'GTRM'), (b'C', b'CIB TRM'), (b'P', b'PM')]),
            preserve_default=True,
        ),
    ]
