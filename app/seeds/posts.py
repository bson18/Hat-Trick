from app.models import db, Post, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        owner_id=1,
        title = "Leonardo was right about Kylian Mbappe: PSG created a monster they simply have to sell",
    )

    post2 = Post(
        owner_id=2,
        title="Wayne Rooney gives his verdict on Declan Rice's £105m transfer after Arsenal hammer his MLS All Stars side",
    )

    post3 = Post(
        owner_id=3,
        title="Mason Greenwood: State of play for Man Utd forward amid ongoing internal investigation",
    )

    post4 = Post(
        owner_id=2,
        title="Vinicius Jr wants Real Madrid job previously held by Cristiano Ronaldo, Sergio Ramos & Karim Benzema",
    )

    post5 = Post(
        owner_id=1,
        title="Lionel Messi magic lights up Miami! Six things we learned as World Cup winner buries late free-kick to spark wild scenes on Inter Miami debut",
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
