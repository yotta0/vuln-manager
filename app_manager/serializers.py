from .models import Hosts, HostsGroup
from users.serializers import CustomUserSerializer
from rest_framework import serializers

class HostsGroupSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)
    created_by_id = serializers.CharField(write_only=True, required=False)
    belongs_to = serializers.SerializerMethodField(read_only=True)
    belongs_to_id = serializers.CharField(write_only=True)
    total_items = serializers.CharField(read_only=True, required=False)
    
    class Meta:
        model = HostsGroup
        fields = '__all__'
    
    def get_belongs_to(self, obj):
        if obj.belongs_to is not None:
            return HostsGroupSerializer(obj.belongs_to).data
        return None


class HostSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)
    created_by_id = serializers.CharField(write_only=True, required=False)
    group = HostsGroupSerializer(read_only=True)
    group_id = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Hosts
        fields = '__all__'
