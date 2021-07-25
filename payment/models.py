from datetime import timedelta

from django.db import models
from django.contrib.auth.models import AbstractUser

class Cliente(AbstractUser):
    saldo = models.FloatField(default=0)
    sim_card = models.CharField(max_length=30, blank=True, null=True)
    planes = models.JSONField(null=True)

    def __str__(self):
        return self.username

class Plan(models.Model):
    costo = models.FloatField()
    duracion = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre

    def get_caducidad(self):
        delta = timedelta(days=self.duracion)
        #delta = timedelta(seconds=120)
        fecha_caduca = self.fecha + delta
        return fecha_caduca.strftime('%m/%d/%Y, %H:%M:%S')

    def get_fields(self):
        return {
            'costo': self.costo,
            'duracion': self.duracion,
            'fecha': self.fecha.strftime('%x'),
            'nombre': self.nombre,
            'fecha_caduca': self.get_caducidad()
        }
