from datetime import datetime

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

def string_to_datetime(fecha):
    'fecha to be of form: 07/26/2021, 09:26:19'
    formato = '%m/%d/%Y, %H:%M:%S'
    return datetime.strptime(fecha, formato)
