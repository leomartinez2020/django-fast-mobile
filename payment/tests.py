from django.test import TestCase
import pytest

from payment.models import Cliente

@pytest.mark.django_db
class TestUser(TestCase):
    def setUp(self):
        plan = {'costo': 2000, 'duracion': 2, 'nombre': 'Internet 40MB'}
        cliente1 = Cliente.objects.create_user(username='Paul', planes={'p1': plan})
        cliente2 = Cliente.objects.create_user(username='John')
        cliente3 = Cliente.objects.create_user(username='Ringo')

    def test_user_name1(self):
        paul = Cliente.objects.get(pk=1)
        assert paul.username == 'Paul'

    def test_user_name2(self):
        john = Cliente.objects.get(pk=2)
        assert john.username == 'John'

    def test_user_planes(self):
        c = Cliente.objects.get(pk=1)
        assert c.planes is not None

