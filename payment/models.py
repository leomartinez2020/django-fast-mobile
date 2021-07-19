from django.db import models
from django.contrib.auth.models import AbstractUser

class Cliente(AbstractUser):
    saldo = models.FloatField(default=0)
    sim_card = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.username

class Plan(models.Model):
    costo = models.FloatField()
    duracion = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    nombre = models.CharField(max_length=200)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.nombre
