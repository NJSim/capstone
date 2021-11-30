from app.models import db, Post, Comment, Like
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
        user_id=1, caption="Honestly, does everyone hate playing video games?", url="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/most-popular-video-games-of-2020-1582141293.png?crop=1.00xw:1.00xh;0,0&resize=1200:*", created_at=today, updated_at=today)
    post2 = Post(
        user_id=2, caption="Hey, I'm Marnie and I'm new to video games! Would love if people commented their favorites! I've been liking Overwatch", url="https://www.trustedreviews.com/wp-content/uploads/sites/54/2014/11/overwatch-preview-1-1.jpg", created_at=today, updated_at=today)

    post3 = Post(
        user_id=3, caption="I'm Bobbie and love the community here! I got a new XBOX recently, any game recommendations?", url="https://compass-ssl.xbox.com/assets/b9/0a/b90ad58f-9950-44a7-87fa-1ee8f0b6a90e.jpg?n=XSX_Page-Hero-0_768x792.jpg", created_at=today, updated_at=today)

    post4 = Post(
        user_id=4, caption="I'm addicted please stop me", url="https://www.dexerto.com/wp-content/uploads/2021/09/27/Overwatch-voice-chat-bug-scaled.jpg", created_at=today, updated_at=today)

    post5= Post(
        user_id=5, caption="Valorant is absolutely my favorite game- try it out everyone!", url="https://cdn.mos.cms.futurecdn.net/E56FpaSWYShMwByomeiN43.png" ,created_at=today, updated_at=today)

    post6= Post(
        user_id=6, caption="Nintendo games are super fun super super super fun!", url="https://assets.nintendo.com/image/upload/f_auto,q_auto,w_960,h_540/ncom/en_US/switch/videos/heg001-07060600/posters/Switch_OLED_AnnounceTRL_LF_16x9_Av20211008_H264_NCL_0703" ,created_at=today, updated_at=today)

    post7= Post(
        user_id=7, caption="Overwatch has been crazy fun lately, try it our yall", url="https://cdn1.dotesports.com/wp-content/uploads/2021/02/19183144/sojourn.jpg" ,created_at=today, updated_at=today)

    post8= Post(
        user_id=8, caption="Diablo is absolutely my favorite game- try it out everyone! Please I need friends to play with", url="https://img-eshop.cdn.nintendo.net/i/30ddc24d80d1c532c99662c208df1850f3efbc37d25c73e20e6bf21b6052232d.jpg" ,created_at=today, updated_at=today)

    post9= Post(
        user_id=9, caption="GTA is just so ridiculous, you can just destroy everything and everyone", url="https://i.ytimg.com/vi/_UB5hpk0iqg/maxresdefault.jpg" ,created_at=today, updated_at=today)

    post10= Post(
        user_id=10, caption="Fortnite is back everyone- I repeat Fortnite is BACK!", url="http://automaton-media.com/en/wp-content/uploads/2021/11/20211116-6173-003.jpg" ,created_at=today, updated_at=today)

    post11= Post(
        user_id=11, caption="BOTW is def a banger- but I like ocarina of time way better", url="https://www.gameinformer.com/sites/default/files/styles/full/public/2021/06/15/c23185eb/switch_sequelzeldabotw_screen_08.jpg" ,created_at=today, updated_at=today)

    post12= Post(
        user_id=12, caption="I need to stop playing League - it's really addicting and I keep losing also Arcane was sick", url="https://www.pcgamesn.com/wp-content/uploads/2021/11/league-of-legends-arcane-phase-3.jpg" ,created_at=today, updated_at=today)


    comment1 = Comment(
        user_id=2, post_id=1, caption="I'm new but I love them!", created_at=today, updated_at=today)
    comment2 = Comment(
        user_id=2, post_id=1, caption="Be more positive!", created_at=today, updated_at=today)
    comment3 = Comment(
        user_id=2, post_id=3, caption="I heard Halo games are pretty fun right?", created_at=today, updated_at=today)
    comment4 = Comment(
        user_id=3, post_id=12, caption="Play any XBOX games?", created_at=today, updated_at=today)
    comment5 = Comment(
        user_id=3, post_id=11, caption="Play any XBOX games? haha", created_at=today, updated_at=today)
    comment6 = Comment(
        user_id=4, post_id=6, caption="What's up I also love nintendo games!", created_at=today, updated_at=today)

    comment7 = Comment(
        user_id=6, post_id=1, caption="Love me some Valorant!", created_at=today, updated_at=today)
    comment8 = Comment(
        user_id=6, post_id=2, caption="Love me some Valorant!", created_at=today, updated_at=today)
    comment9 = Comment(
        user_id=6, post_id=3, caption="Love me some Valorant!", created_at=today, updated_at=today)
    comment10 = Comment(
        user_id=6, post_id=4, caption="Love me some Valorant!", created_at=today, updated_at=today)
    comment11 = Comment(
        user_id=6, post_id=5, caption="Love me some Valorant!", created_at=today, updated_at=today)
    comment12 = Comment(
        user_id=6, post_id=6, caption="Love me some Valorant!", created_at=today, updated_at=today)
    comment13 = Comment(
        user_id=6, post_id=7, caption="Love me some Valorant!", created_at=today, updated_at=today)

    comment14 = Comment(
        user_id=7, post_id=11, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)
    comment15 = Comment(
        user_id=7, post_id=12, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)
    comment16 = Comment(
        user_id=7, post_id=3, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)
    comment17 = Comment(
        user_id=7, post_id=4, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)
    comment18 = Comment(
        user_id=7, post_id=5, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)
    comment19 = Comment(
        user_id=7, post_id=6, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)
    comment20 = Comment(
        user_id=7, post_id=7, caption="Love me some Overwatch, anyone down to play?!", created_at=today, updated_at=today)

    comment21 = Comment(
        user_id=10, post_id=8, caption="Fortnite players ASSEMBLE I got sasuke", created_at=today, updated_at=today)
    comment22 = Comment(
        user_id=10, post_id=9, caption="Fortnite players ASSEMBLE I got sasuke", created_at=today, updated_at=today)
    comment23 = Comment(
        user_id=10, post_id=10, caption="Fortnite players ASSEMBLE I got sasuke", created_at=today, updated_at=today)
    comment24 = Comment(
        user_id=10, post_id=3, caption="Fortnite players ASSEMBLE I got sasuke", created_at=today, updated_at=today)
    comment25 = Comment(
        user_id=11, post_id=12, caption="Thtat's awesome!!!!", created_at=today, updated_at=today)
    comment26 = Comment(
        user_id=11, post_id=11, caption="OMG that's sick haha jk", created_at=today, updated_at=today)
    comment27 = Comment(
        user_id=12, post_id=1, caption="Me when I play LOL", created_at=today, updated_at=today)

    like1 = Like(user_id=2, post_id=1, created_at=today, updated_at=today)
    like2 = Like(user_id=2, post_id=2, created_at=today, updated_at=today)
    like3 = Like(user_id=2, post_id=3, created_at=today, updated_at=today)
    like4 = Like(user_id=2, post_id=4, created_at=today, updated_at=today)
    like5 = Like(user_id=2, post_id=5, created_at=today, updated_at=today)
    like6 = Like(user_id=2, post_id=6, created_at=today, updated_at=today)
    like7 = Like(user_id=2, post_id=7, created_at=today, updated_at=today)
    like8 = Like(user_id=2, post_id=8, created_at=today, updated_at=today)
    like9 = Like(user_id=2, post_id=9, created_at=today, updated_at=today)
    like10 = Like(user_id=1,post_id=2, created_at=today, updated_at=today)
    like11 = Like(user_id=2, post_id=10, created_at=today, updated_at=today)
    like12 = Like(user_id=2, post_id=11, created_at=today, updated_at=today)
    like13 = Like(user_id=2, post_id=12, created_at=today, updated_at=today)
    like14 = Like(user_id=3, post_id=1, created_at=today, updated_at=today)
    like15 = Like(user_id=3, post_id=2, created_at=today, updated_at=today)
    like16 = Like(user_id=3, post_id=3, created_at=today, updated_at=today)
    like17 = Like(user_id=3, post_id=4, created_at=today, updated_at=today)
    like18 = Like(user_id=3, post_id=5, created_at=today, updated_at=today)
    like19 = Like(user_id=3, post_id=6, created_at=today, updated_at=today)
    like20 = Like(user_id=3, post_id=7, created_at=today, updated_at=today)

    like21 = Like(user_id=4, post_id=10, created_at=today, updated_at=today)
    like22 = Like(user_id=4, post_id=11, created_at=today, updated_at=today)
    like23 = Like(user_id=4, post_id=12, created_at=today, updated_at=today)
    like24 = Like(user_id=4, post_id=1, created_at=today, updated_at=today)
    like25 = Like(user_id=5, post_id=2, created_at=today, updated_at=today)
    like26 = Like(user_id=5, post_id=3, created_at=today, updated_at=today)
    like27 = Like(user_id=5, post_id=4, created_at=today, updated_at=today)
    like28 = Like(user_id=5, post_id=5, created_at=today, updated_at=today)
    like29 = Like(user_id=5, post_id=6, created_at=today, updated_at=today)
    like30 = Like(user_id=5, post_id=7, created_at=today, updated_at=today)

    like31 = Like(user_id=6, post_id=10, created_at=today, updated_at=today)
    like32 = Like(user_id=6, post_id=11, created_at=today, updated_at=today)
    like33 = Like(user_id=6, post_id=12, created_at=today, updated_at=today)
    like34 = Like(user_id=7, post_id=1, created_at=today, updated_at=today)
    like35 = Like(user_id=7, post_id=2, created_at=today, updated_at=today)
    like36 = Like(user_id=7, post_id=3, created_at=today, updated_at=today)
    like37 = Like(user_id=8, post_id=4, created_at=today, updated_at=today)
    like38 = Like(user_id=8, post_id=5, created_at=today, updated_at=today)
    like39 = Like(user_id=8, post_id=6, created_at=today, updated_at=today)
    like40 = Like(user_id=8, post_id=7, created_at=today, updated_at=today)

    like41 = Like(user_id=9, post_id=10, created_at=today, updated_at=today)
    like42 = Like(user_id=9, post_id=11, created_at=today, updated_at=today)
    like43 = Like(user_id=9, post_id=12, created_at=today, updated_at=today)
    like44 = Like(user_id=10, post_id=1, created_at=today, updated_at=today)
    like45 = Like(user_id=10, post_id=2, created_at=today, updated_at=today)
    like46 = Like(user_id=11, post_id=3, created_at=today, updated_at=today)
    like47 = Like(user_id=11, post_id=4, created_at=today, updated_at=today)
    like48 = Like(user_id=12, post_id=5, created_at=today, updated_at=today)
    like49 = Like(user_id=12, post_id=6, created_at=today, updated_at=today)
    like50 = Like(user_id=12, post_id=7, created_at=today, updated_at=today)


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment10)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)


    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)

    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)
    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.add(like20)

    db.session.add(like21)
    db.session.add(like22)
    db.session.add(like23)
    db.session.add(like24)
    db.session.add(like25)
    db.session.add(like26)
    db.session.add(like27)
    db.session.add(like28)
    db.session.add(like29)
    db.session.add(like30)

    db.session.add(like31)
    db.session.add(like32)
    db.session.add(like33)
    db.session.add(like34)
    db.session.add(like35)
    db.session.add(like36)
    db.session.add(like37)
    db.session.add(like38)
    db.session.add(like39)
    db.session.add(like40)

    db.session.add(like41)
    db.session.add(like42)
    db.session.add(like43)
    db.session.add(like44)
    db.session.add(like45)
    db.session.add(like46)
    db.session.add(like47)
    db.session.add(like48)
    db.session.add(like49)
    db.session.add(like50)

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
