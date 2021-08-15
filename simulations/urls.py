from django.urls import path
from django.views.generic import TemplateView

app_name = 'simulations'
urlpatterns = [
    path('', TemplateView.as_view(template_name='simulations/index.html'), name='sims'),
]
