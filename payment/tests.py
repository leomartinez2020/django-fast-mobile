import os

from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from playwright.sync_api import sync_playwright
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



@pytest.mark.django_db
class MyViewTests(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        plan = {'costo': 2000, 'duracion': 2, 'nombre': 'Internet 40MB'}
        cliente1 = Cliente.objects.create_user(username='Pablo', password='beatles123', planes={'p1': plan})
        os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
        super().setUpClass()
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.browser.close()
        cls.playwright.stop()

    def test_login(self):
        page = self.browser.new_page()
        page.goto(f"{self.live_server_url}")
        page.click('text=Ingresar')
        page.fill('#id_username', 'Pablo')
        page.fill('#id_password', 'beatles123')
        page.click('text=Enviar')
        page.wait_for_selector('text=Hola Pablo')
        username = page.text_content("#username")
        assert username == "Hola Pablo"
        page.close()
