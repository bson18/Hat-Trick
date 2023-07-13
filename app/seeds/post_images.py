from app.models import db, PostImage, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_post_images():
    image1 = PostImage(
        post_id=1,
        image="https://hat-trick-bson.s3.us-east-2.amazonaws.com/test.jpg"
    )

    image2 = PostImage(
        post_id=2,
        image="https://hat-trick-bson.s3.us-east-2.amazonaws.com/GOAL_-_Multiple_Images_-_3_Stacked_-_Facebook_(1).png"
    )

    image3 = PostImage(
        post_id=3,
        image="https://hat-trick-bson.s3.us-east-2.amazonaws.com/sms.png"
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_images")

    db.session.commit()
