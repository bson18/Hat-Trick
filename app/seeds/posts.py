from app.models import db, Post, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        owner_id=1,
        title = "Test Article Title",
    )

    post2 = Post(
        owner_id=2,
        title="Six Liverpool players with plenty to prove in pre-season",
    )

    post3 = Post(
        owner_id=3,
        title="Al-Hilal have pulled off the Saudi Pro League signing of the year with €40m Milinkovic-Savic",
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
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
