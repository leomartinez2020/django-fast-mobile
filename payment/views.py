from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib import messages

from .models import Plan, Cliente

from process import unpickle_data
from utils import agregar_plan, SaldoInsuficienteError

def page_not_found(request, exception):
    return render(request, 'payment/not_found.html')

def index(request):
    planes = Plan.objects.all()
    return render(request, 'payment/index.html', {'planes': planes})

def activar_plan(request, plan_id):
    plan = get_object_or_404(Plan, pk=plan_id)
    cliente = get_object_or_404(Cliente, pk=int(request.user.id))
    #print(request.user)
    try:
        agregar_plan(cliente, plan)
        messages.success(request, 'Tu plan se actualizó con éxito!')
    except SaldoInsuficienteError:
        messages.error(request, 'Lo sentimos. Saldo insuficiente')
    #return HttpResponse(f'{request.user.id} - {plan.nombre}')
    #return HttpResponseRedirect(reverse('payment:index'))
    finally:
        return redirect('payment:index')

def dashboard(request):
    data = unpickle_data('mongodict.p')
    return render(request, 'payment/dashboard.html', {'data': data})
