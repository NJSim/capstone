from app.models import db, Post, Comment
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_posts():
    today = date.today()
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')
    # nick = User(
    #     username='nick', email='nick@aa.io', password='password')


    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.add(nick)

    # db.session.commit()
    post1 = Post(
        user_id=1, caption="This is User 1's first post",created_at=today, updated_at=today)
    post2 = Post(
        user_id=1, caption="This is User 1's second post",created_at=today, updated_at=today)

    post3 = Post(
        user_id=2, caption="this is User 2's first post",created_at=today, updated_at=today)

    post4 = Post(
        user_id=3, caption="this is User 3's first post",created_at=today, updated_at=today)

    post5= Post(
        user_id=4, caption="this is Nick's first post",created_at=today, updated_at=today)

    comment1 = Comment(
        user_id=2, post_id=1, caption="I am user 2 commenting on user 1's photo",created_at=today, updated_at=today)
    comment2 = Comment(
        user_id=3, post_id=1, caption="I am user 3 commenting on user 1's photo",created_at=today, updated_at=today)
    comment3 = Comment(
        user_id=1, post_id=2, caption="I am user 1 commenting on user 2's photo",created_at=today, updated_at=today)
    comment4 = Comment(
        user_id=1, post_id=2, caption="I am user 1 commenting on user 2's photo AGAIN",created_at=today, updated_at=today)
    comment5 = Comment(
        user_id=1, post_id=1, caption="I am user 1 commenting on my own photo",created_at=today, updated_at=today)



    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    # db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    # db.session.commit()
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE')
    db.session.commit()
