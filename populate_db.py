from payment.models import Plan, Cliente

PLANS = [
    {'costo': 2000, 'duracion': 2, 'nombre': 'Internet 40MB'},
    {'costo': 2000, 'duracion': 2, 'nombre': 'Llamadas 60 Min'},
    {'costo': 3000, 'duracion': 3, 'nombre': 'Internet 60MB'},
    {'costo': 6000, 'duracion': 5, 'nombre': 'Internet 300MB'},
    {'costo': 5000, 'duracion': 7, 'nombre': 'Llamadas 150 Min'},
]

PEOPLE = [
    {'username': 'Paul', 'password': 'beatles123', 'saldo': 10000, 'sim_card': '3002761432'},
    {'username': 'John', 'password': 'beatles123', 'saldo': 10000, 'sim_card': '3012166492'},
    {'username': 'Ringo', 'password': 'beatles123', 'saldo': 10000, 'sim_card': '3203069805'},
]

def populate():
    for elem in PLANS:
        p = Plan(**elem)
        p.save()
        print('done')
    for person in PEOPLE:
        c = Cliente(**person)
        c.save()
