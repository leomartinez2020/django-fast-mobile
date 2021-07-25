from celery import shared_task
from .models import Cliente

from .utils import logger

@shared_task
def schedule_caducar(c_id, key):
    cliente = Cliente.objects.get(pk=c_id)
    #cad = cliente.planes[key]['fecha_caduca']
    cad = cliente.planes[key]
    del cliente.planes[key]
    cliente.save()
    logger.info(f'{cad} was deleted from user {c_id}')
    return f'{cad} was deleted'
