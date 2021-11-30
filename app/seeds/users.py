from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='demo test')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', bio='demo marnie')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', bio='demo bobbie')
    nick = User(
        username='nick', email='nick@aa.io', password='password', bio='demo nick')
    iLoveValorant = User(
        username='iLoveValorant', email='valorantlove@gmail.com', password='password', bio='love val')
    NintendoGuy = User(
        username='NintendoGuy', email='nintendo2223@gmail.com', password='password', bio='i like nintendo and more')
    overwatchIsLife = User(
        username='OWisLife', email='ow4life@aa.io', password='password', bio='winstons fun!')
    DiabloIsLife = User(
        username='DiabloisLife', email='Diablo4life@aa.io', password='password', bio='winstons fun!')
    GTAIsLife = User(
        username='GTAisLife', email='GTA4life@aa.io', password='password', bio='winstons fun!')
    FortNiteIsLife = User(
        username='FortniteisLife', email='Fortnite4life@aa.io', password='password', bio='winstons fun!')
    ZeldaIsLife = User(
        username='ZeldaisLife', email='Zelda4life@aa.io', password='password', bio='winstons fun!')
    LOLIsLife = User(
        username='iLoveHateLOL', email='LOL4life@aa.io', password='password', bio='winstons fun!')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(nick)
    db.session.add(iLoveValorant)
    db.session.add(NintendoGuy)
    db.session.add(overwatchIsLife)
    db.session.add(DiabloIsLife)
    db.session.add(GTAIsLife)
    db.session.add(FortNiteIsLife)
    db.session.add(ZeldaIsLife)
    db.session.add(LOLIsLife)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
