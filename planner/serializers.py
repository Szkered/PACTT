from rest_framework import serializers

from planner.models import *


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = {'id', 'date', 'datacenter', 'description', 'created_at', 'updated_at'}
        read_only_field = {'id', 'created_at', 'updated_at'}

class TestPhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestPhase
        fields = {'id', 'event', 'startTime', 'endTime', 'description', 'lob',
                  'created_at', 'updated_at'}
        read_only_field = {'id', 'created_at', 'updated_at'}

    # def get_validation_exclusions(self, *args, **kwargs):
    #     exclusions = super(TestPhaseSerializer, self).get_validation_exclusions()

    #     return exclusions + ['event']
