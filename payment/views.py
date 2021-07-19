from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from .utils import actualizar_saldo

from .models import Plan, Cliente

def index(request):
    planes = Plan.objects.all()
    return render(request, 'payment/index.html', {'planes': planes})

def activar_plan(request, plan_id):
    plan = get_object_or_404(Plan, pk=plan_id)
    cliente = get_object_or_404(Cliente, pk=int(request.user.id))
    print(request.user)
    actualizar_saldo(cliente, plan)
    #return HttpResponse(f'{request.user.id} - {plan.nombre}')
    return HttpResponseRedirect(reverse('payment:index'))