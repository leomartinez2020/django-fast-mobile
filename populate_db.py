from payment.models import Plan, Cliente

PLANS = [{'costo': 2000.0, 'duracion': 2, 'nombre': 'Fast 60MB + Redes'}, {'costo': 2000.0, 'duracion': 3, 'nombre': 'Fast 40 Min'}, {'costo': 3000.0, 'duracion': 3, 'nombre': 'Fast 180MB'}, {'costo': 3000.0, 'duracion': 7, 'nombre': 'Fast 60 Min'}, {'costo': 3000.0, 'duracion': 3, 'nombre': 'LDI Norteamérica'}, {'costo': 4000.0, 'duracion': 7, 'nombre': 'Fast 300MB'}, {'costo': 4000.0, 'duracion': 2, 'nombre': 'Voz Internacional 1'}, {'costo': 4500.0, 'duracion': 7, 'nombre': 'LDI Venezuela'}, {'costo': 5000.0, 'duracion': 5, 'nombre': 'Voz Internacional 2'}, {'costo': 5000.0, 'duracion': 5, 'nombre': 'Fast 100 Min'}, {'costo': 5500.0, 'duracion': 20, 'nombre': 'Fast Social'}, {'costo': 10000.0, 'duracion': 7, 'nombre': 'Fast 210 Min'}, {'costo': 12000.0, 'duracion': 20, 'nombre': 'Fast 1GB'}, {'costo': 30000.0, 'duracion': 5, 'nombre': 'Fast 2.5GB'}]

PEOPLE = [
    {'username': 'Paul', 'password': 'beatles123', 'saldo': 10000, 'sim_card': '3002761432'},
    {'username': 'John', 'password': 'beatles123', 'saldo': 10000, 'sim_card': '3012166492'},
    {'username': 'Ringo', 'password': 'beatles123', 'saldo': 10000, 'sim_card': '3203069805'},
]

def populate_planes():
    for elem in PLANS:
        p = Plan(**elem)
        p.save()
        print('done plan')

def populate_clients():
    for person in PEOPLE:
        c = Cliente.objects.create_user(**person)
        c.save()
        print('done person')
