from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('payment.urls')),
    path('simulations/', include('simulations.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
]

handler404 = 'payment.views.page_not_found'
