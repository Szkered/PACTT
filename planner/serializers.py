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

class AppSerializer(serializers.ModelSerializer):

    class Meta:
        model = App
        fields = {'id', 'aid', 'name', 'RTO', 'priority'}
        read_only_field = {'id'}

class ScopeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scope
        fields = {'id', 'event', 'app', 'scoped', 'descope_reason'}
        read_only_field = {'id'}   


class AssignmentSerializer(serializers.ModelSerializer):
    scope = ScopeSerializer(read_only=True)

    class Meta:
        model = Assignment
        fields = {'id', 'scope', 'account', 'description'}
        # read_only_field = {'id', 'scope', 'account', 'description'}

class TestResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestResult
        fields = {'id', 'app', 'testPhase', 'startTime', 'endTime', 'status', 'comment'}
        read_only_field = {'id', 'app', 'testPhase'}
