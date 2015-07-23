from rest_framework import permissions, viewsets
from rest_framework.response import Response

from planner.models import *
from planner.serializers import *


class EventViewSet(viewsets.ModelViewSet):
    lookup_field = 'pk'
    queryset = Event.objects.order_by('date')
    serializer_class = EventSerializer

    # TODO: get_permissions

class TestPhaseViewSet(viewsets.ModelViewSet):
    queryset = TestPhase.objects.order_by('startTime')
    serializer_class = TestPhaseSerializer

    
class EventTestPhasesViewSet(viewsets.ViewSet):
    queryset = TestPhase.objects.order_by('startTime').select_related('Event').all()
    serializer_class = TestPhaseSerializer

    def list(self, request, event_pk=None):
        queryset = self.queryset.filter(event__pk=event_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    
class AppViewSet(viewsets.ModelViewSet):
    queryset = App.objects.order_by('aid')
    serializer_class = AppSerializer
    

class ScopeViewSet(viewsets.ModelViewSet):
    queryset = Scope.objects.order_by('app__aid')
    serializer_class = ScopeSerializer


class EventScopesViewSet(viewsets.ViewSet):
    queryset = Scope.objects.order_by('app__aid').select_related('Event').all()
    serializer_class = ScopeSerializer

    def list(self, request, event_pk=None):
        queryset = self.queryset.filter(event__pk=event_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
    
class AccountAssignmentsViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.select_related('account').all()
    serializer_class = AssignmentSerializerNested

    def list(self, request, account_sid=None):
        queryset = self.queryset.filter(account__sid=account_sid)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

class TestResultViewSet(viewsets.ModelViewSet):
    queryset = TestResult.objects.order_by('testPhase')
    serializer_class = TestResultSerializer

class TestPhaseTestResultsViewSet(viewsets.ModelViewSet):
    queryset = TestResult.objects.order_by('testPhase').select_related('TestPhase').all()
    serializer_class = TestResultSerializer
    
    def list(self, request, testPhase_pk=None):
        queryset = self.queryset.filter(testPhase__pk=testPhase_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

class EventTestResultsViewSet(viewsets.ModelViewSet):
    queryset = TestResult.objects.order_by('testPhase__startTime').select_related('event').all()
    serializer_class = TestResultSerializerNested
    
    def list(self, request, event_pk=None):
        queryset = self.queryset.filter(testPhase__event__pk=event_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
