from rest_framework import permissions, viewsets
from rest_framework.response import Response

from planner.models import *
from planner.serializers import *


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.order_by('date')
    serializer_class = EventSerializer

    # TODO: get_permissions

class TestPhaseViewSet(viewsets.ViewSet):
    queryset = TestPhase.objects.order_by('startTime')
    serializer_class = TestPhaseSerializer

    
class EventTestPhaseViewSet(viewsets.ViewSet):
    queryset = TestPhase.objects.select_related('Event').all()
    serializer_class = TestPhaseSerializer

    def list(self, request, event_pk=None):
        queryset = self.queryset.filter(event__pk=event_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
