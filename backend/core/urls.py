from django.urls import path
from . import views
from .views import *
from django.conf.urls import url

urlpatterns = [
    path('abcd/<str:id>', AbcdView.as_view(), name="abcd name"),
    path('country/<str:country>/type/<str:type>/variant/<str:variant>/start/<str:start>/end/<str:end>', DetailView.as_view()),
    path('map/<str:start>',MapView.as_view()),
<<<<<<< HEAD
    path('summary/<str:country>',CountrySumView.as_view()),
    path('world/variant_mix',PieChar.as_view()),
=======
    path('register', views.register_request, name="register"),
    path("login", views.login_request, name="login"),
>>>>>>> 66b31b195a318c5611ce3a204bd4ed06b2dc1a69
]