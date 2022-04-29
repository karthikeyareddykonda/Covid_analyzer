from django.urls import path
from . import views
from .views import *
from django.conf.urls import url

urlpatterns = [
    path('abcd/<str:id>', AbcdView.as_view(), name="abcd name"),
    path('country/<str:country>/type/<str:type>/variant/<str:variant>/start/<str:start>/end/<str:end>', DetailView.as_view()),
    path('map/<str:start>',MapView.as_view()),
    path('register', views.register_request, name="register"),
    path("login", views.login_request, name="login"),
]