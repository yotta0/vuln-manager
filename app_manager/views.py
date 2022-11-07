from rest_framework.viewsets import ModelViewSet
from .serializers import (
    Hosts, HostSerializer, HostsGroup, HostsGroupSerializer
)
from rest_framework.response import Response
from vuln_manager.custom_methods import IsAuthenticatedCustom
from vuln_manager.utils import CustomPagination, get_query
from django.db.models import Count

class HostView(ModelViewSet):
    queryset = Hosts.objects.select_related('group', 'created_by')
    serializer_class = HostSerializer
    permission_classes = (IsAuthenticatedCustom,)
    pagination_class = CustomPagination

    def get_queryset(self):
        if self.request.method.lower() != 'get':
            return self.queryset

        data = self.request.query_params.dict()
        data.pop('page')
        keyword = data.pop('keyword', None)

        results = self.queryset(**data)

        if keyword:
            search_fields = (
                'code', 'created_by__full_name', 'created_by__email' 'group__name', 'name'
            )
            query = get_query(keyword, search_fields)
            results = results.filter(query)
        
        return results


    def create(self, request, *args, **kwargs):
        request.data.update({'created_by_id': request.user.id})
        return super().create(request, *args, **kwargs)

class HostGroupView(ModelViewSet):
    queryset = HostsGroup.objects.select_related(
        'belongs_to', 'created_by').prefetch_related('hosts')
    serializer_class = HostsGroupSerializer
    permission_classes = (IsAuthenticatedCustom,)
    pagination_class = CustomPagination

    def get_queryset(self):
        if self.request.method.lower() != 'get':
            return self.queryset

        data = self.request.query_params.dict()
        data.pop('page')
        keyword = data.pop('keyword', None)

        results = self.queryset(**data)

        if keyword:
            search_fields = (
                'created_by__full_name', 'created_by__email', 'name'
            )
            query = get_query(keyword, search_fields)
            results = results.filter(query)
        
        return results.annotate(
            total_items = Count('hosts_items')
        )

    def create(self, request, *args, **kwargs):
        request.data.update({'created_by_id': request.user.id})
        return super().create(request, *args, **kwargs)
