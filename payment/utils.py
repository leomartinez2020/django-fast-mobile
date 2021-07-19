
def actualizar_saldo(cliente, pago):
    pago.cliente = cliente
    cliente.saldo -= pago.costo
    cliente.save()
    pago.save()