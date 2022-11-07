from rest_framework.viewsets import ModelViewSet
from .serializers import (
    Hosts, HostSerializer, HostsGroup, HostsGroupSerializer
)
from rest_framework.response import Response
from vuln_manager.custom_methods import IsAuthenticatedCustom
from vuln_manager.utils import CustomPagination, get_query
from django.db.models import Count
from users.models import CustomUser
import csv
import codecs

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


class SummaryView(ModelViewSet):
    http_method_names = ('get',)
    permission_classes = (IsAuthenticatedCustom,)
    queryset = HostView.queryset

    def list(self, request, *args, **kwargs):
        total_host = HostView.queryset.filter(
            remaining__gt=0
        ).count()
        total_group = HostGroupView.queryset.count()
        total_users = CustomUser.objects.filter(is_superuser=False).count()

        return Response({
            'total_host': total_host,
            'total_group': total_group,
            'total_users': total_users
        })


class HostCSVLoaderView(ModelViewSet):
    http_method_names = ('post')
    queryset = HostView.queryset
    permission_classes = (IsAuthenticatedCustom,)
    serializer_class = HostSerializer

    def create(self, request, *args, **kwargs):
        try:
            data = request.FILES['data']
        except Exception as e:
            raise Exception('You need to upload a file CSV data')
        
        host_items = []

        try:
            csv_reader = csv.reader(codecs.iterdecode(data, 'utf-8'))
            for row in csv_reader:
                if not row[0]:
                    continue
                host_items.append(
                    {
                        'group_id': row[0],
                        'total': row[1],
                        'name': row[2],
                        'added_by_id': request.user.id
                    }
                )
        except csv.Error as e:
            raise Exception('File CSV not valid, error: {}'.format(e))
        
        if not host_items:
            raise Exception('File CSV is empty')
        
        data_validation = self.serializer_class(data=host_items, many=True)
        data_validation.is_valid(raise_exception=True)
        data_validation.save()

        return Response({'success': 'Host itens has been added'})
