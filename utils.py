from datetime import datetime, timedelta

from payment.tasks import schedule_caducar

class SaldoInsuficienteError(Exception):
    pass

def agregar_plan(cliente, plan):
    if cliente.saldo < plan.costo:
        print('yerda, error desde util')
        raise SaldoInsuficienteError('something wrong happened')
    plan.fecha = datetime.now()
    plan.save()
    data = plan.get_fields()
    if cliente.planes is None:
        clave = 'p1'
        cliente.planes = {clave: data}
    else:
        clave = f'p{len(cliente.planes) + 1}'
        cliente.planes[clave] = data
    cliente.saldo -= plan.costo
    cliente.save()
    ahorita = datetime.utcnow() + timedelta(seconds=120)
    fecha_caducidad = fecha_to_utc(data['fecha_caduca'])
    schedule_caducar.apply_async((cliente.pk, clave), eta=fecha_caducidad)

def string_to_datetime(fecha):
    'fecha to be of form: 07/26/2021, 09:26:19'
    formato = '%m/%d/%Y, %H:%M:%S'
    return datetime.strptime(fecha, formato)

def fecha_to_utc(fecha):
    'fecha is a string like 07/29/2021, 19:58:28'
    return string_to_datetime(fecha) + timedelta(hours=5)
