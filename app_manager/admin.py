from django.contrib import admin
from .models import Hosts, HostsGroup

admin.site.register(Hosts)
admin.site.register(HostsGroup)