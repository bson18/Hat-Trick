from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id=2,
        post_id=1,
        comment="Yeah Mbappe seems like more headache than he's worth!"
    )

    comment4 = Comment(
        user_id=3,
        post_id=1,
        comment = "What are you crazy? He is the next number 1 player in the world! He's worth any amount of drama."
    )

    comment2 = Comment(
        user_id=1,
        post_id=2,
        comment="Overrated"
    )

    comment3 = Comment(
        user_id=3,
        post_id=2,
        comment="Hell yeah! Rice is gonna take us to the top! I'm calling it now, 23/24 PL CHAMPIONS!"
    )

    comment5 = Comment(
        user_id=2,
        post_id=3,
        comment="Get that loser out of the club"
    )

    comment6 = Comment(
        user_id=1,
        post_id=3,
        comment="Yeah... I don't want him anywhere near the club"
    )

    comment7 = Comment(
        user_id=1,
        post_id=4,
        comment="No shot. Give them to someone else with more experience"
    )

    comment8 = Comment(
        user_id=3,
        post_id=4,
        comment="He's earned the chance. If he wants them, let him have them."
    )

    comment9 = Comment(
        user_id=3,
        post_id=5,
        comment="He's still got it. GOAT!"
    )

    comment10 = Comment(
        user_id=2,
        post_id=5,
        comment="I can't believe he's here. He's soooo good"
    )

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
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
