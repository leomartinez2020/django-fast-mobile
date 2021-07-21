class SaldoInsuficienteError(Exception):
    pass

def agregar_plan(cliente, plan):
    if cliente.saldo < plan.costo:
        print('yerda, error desde util')
        raise SaldoInsuficienteError('something wrong happened')
    data = plan.get_fields()
    if cliente.planes is None:
        clave = 'p1'
        cliente.planes = {clave: data}
    else:
        clave = f'p{len(cliente.planes) + 1}'
        cliente.planes[clave] = data
    cliente.saldo -= plan.costo
    cliente.save()
