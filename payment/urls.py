from django.urls import path, include

from . import views

app_name = 'payment'
urlpatterns = [
    path('', views.index, name='index'),
    path('panel/', views.dashboard, name='dashboard'),
    path('<int:plan_id>/', views.activar_plan, name='activar_plan'),
]
