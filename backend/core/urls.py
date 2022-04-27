from django.urls import path
from .views import *
from django.conf.urls import url

urlpatterns = [
    path('abcd/<int:id>', AbcdView.as_view(), name="abcd name"),
    # url(r'^abcd/(?P<ss>[a-z.@_0-9]+)$', AbcdView.as_view()),
]