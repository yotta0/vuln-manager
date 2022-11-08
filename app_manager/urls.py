from django.urls import path, include
from .views import (
    HostView, HostGroupView, SummaryView, HostCSVLoaderView
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

router.register('hosts', HostView, 'hosts')
router.register('hosts-csv', HostCSVLoaderView, 'hosts-csv')
router.register('group', HostGroupView, 'group')
router.register('summary', SummaryView, 'summary')

urlpatterns = [
    path('', include(router.urls))
]
