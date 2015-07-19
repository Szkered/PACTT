from django.db import models
from authentication.models import Account


class Event(models.Model):
    date = models.DateField()
    datacenter = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TestPhase(models.Model):
    event = models.ForeignKey(Event)
    startTime = models.TimeField()
    endTime = models.TimeField()
    description = models.CharField(max_length=50)
    LOB_TYPE = (
        ('G', 'GTRM'),
        ('C', 'CIB TRM'),
        ('P', 'PM')
    )
    lob = models.CharField(max_length=1, choices=LOB_TYPE, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class App(models.Model):
    aid = models.CharField(max_length=7, unique=True)
    name = models.CharField(max_length=50)
    RTO = models.FloatField()
    priority = models.IntegerField()

class Scope(models.Model):
    event = models.ForeignKey(Event)
    app = models.ForeignKey(App)
    scoped = models.BooleanField(default=True)
    descope_reason = models.CharField(max_length=50, blank=True)
    
    class Meta:
        unique_together = ('event', 'app')
        ordering = ['app__id']

class Assignment(models.Model):
    scope = models.ForeignKey(Scope)
    account = models.ForeignKey(Account)
    description = models.CharField(max_length=50)

class TestResult(models.Model):
    app = models.ForeignKey(App)
    testPhase = models.ForeignKey(TestPhase)
    startTime = models.TimeField()
    endTime = models.TimeField()
    STATUS_TYPE = (
        ('C', 'Completed with No Issue'),
        ('I', 'Completed with Issue'),
        ('N', 'Not Yet Started'),
        ('F', 'Failed')
    )
    status = models.CharField(max_length=1, choices=STATUS_TYPE, default='N')
    comment = models.CharField(max_length=100, blank=True)
