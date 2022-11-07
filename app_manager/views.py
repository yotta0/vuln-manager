from rest_framework.viewsets import ModelViewSet
from .serializers import (
    Hosts, HostSerializer, HostsGroup, HostsGroupSerializer
)
from rest_framework.response import Response
from vuln_manager.custom_methods import IsAuthenticatedCustom

class HostView(ModelViewSet):
    queryset = Hosts.objects.select_related('group', 'created_by')
    serializer_class = HostSerializer
    permission_classes = (IsAuthenticatedCustom,)

    def create(self, request, *args, **kwargs):
        request.data.update({'created_by_id': request.user.id})
        return super().create(request, *args, **kwargs)

class HostGroupView(ModelViewSet):
    queryset = HostsGroup.objects.select_related(
        'belongs_to', 'created_by').prefetch_related('hosts')
    serializer_class = HostsGroupSerializer
    permission_classes = (IsAuthenticatedCustom,)

    def create(self, request, *args, **kwargs):
        request.data.update({'created_by_id': request.user.id})
        return super().create(request, *args, **kwargs)
