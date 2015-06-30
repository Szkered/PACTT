# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='App',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('aid', models.CharField(unique=True, max_length=7)),
                ('name', models.CharField(max_length=50)),
                ('RTO', models.FloatField()),
                ('priority', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=50)),
                ('account', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('app', models.ForeignKey(to='planner.App')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField()),
                ('datacenter', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Scope',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('app', models.ForeignKey(to='planner.App')),
                ('event', models.ForeignKey(to='planner.Event')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TestPhase',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('startTime', models.DateField()),
                ('endTime', models.DateField()),
                ('description', models.CharField(max_length=50)),
                ('lob', models.CharField(blank=True, max_length=1, choices=[(b'G', b'GTRM'), (b'C', b'CIB')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('event', models.ForeignKey(to='planner.Event')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TestResult',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('startTime', models.DateField()),
                ('endTime', models.DateField()),
                ('status', models.CharField(max_length=1, choices=[(b'C', b'Completed with No Issue'), (b'I', b'Completed with Issue'), (b'N', b'Not Yet Started'), (b'F', b'Failed')])),
                ('comment', models.CharField(max_length=100)),
                ('TestPhase', models.ForeignKey(to='planner.TestPhase')),
                ('app', models.ForeignKey(to='planner.App')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
