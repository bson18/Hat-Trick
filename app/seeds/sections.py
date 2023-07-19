from app.models import db, Section, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_sections():
    section1 = Section(
        post_id=1,
        section_heading = 'Test Section Heading 1',
        section = 'Test Section 1',
        image = 'section1image.png',
        order = 1
    )

    section4 = Section(
        post_id=1,
        section_heading= 'Test Section Heading 2',
        section = 'Test Section 2',
        image = 'section4image.png',
        order = 2
    )

    section2 = Section(
        post_id=2,
        section_heading = "Nearly every member of Jurgen Klopp's squad have returned to Kirkby this week and some need to hit the ground running more than others...",
        section = "Liverpool are back! Well, at the AXA Training Centre at least, with pre-season training having got under way earlier this week. The players are returning in dribs and drabs, owing to their various international commitments in recent weeks - Harvey Elliott and Curtis Jones, for example, have yet to appear because of their involvement in England's triumph at the Under-21s European Championship, which was only wrapped up on Saturday night. However, Jurgen Klopp expects to have an almost full-strength squad for their German training camp, ahead of next Wednesday's first friendly, against Karlsruher. Liverpool's first competitive fixture, the Premier League opener clash with Chelsea at Stamford Bridge, is still more than a month away but you can be sure that several Reds will be determined to hit the ground running in pre-season. Indeed, after a trying season that saw Liverpool fail to qualify for the Champions League, a significant number of players have plenty to prove ahead of the start of the 2023-24 campaign on August 13...",
        image = 'section2image.png',
        order = 1
    )

    section3 = Section(
        post_id=3,
        section_heading = "All summer long, GOAL's Mark Doyle will be handing out grades for the biggest transfers from around the world",
        section = "July 12: Sergej Milinkovic-Savic (Lazio To Al-Hilal, €40m) For Lazio: An exit that seriously stings. The Sergeant was such a loyal and popular servant to the club, and integral to Lazio securing a shock return to next season's Champions League. He will be sorely missed. But, at the end of the day, it was clear that Milinkovic-Savic was going to leave the club this summer - his contract was due to expire next year - and club president Claudio Lotito has managed to find a buyer willing to meet the asking price. The fans are rightly furious with 'SMS' for leaving but they are majorly relieved that he hasn't been sold to a Serie A rival. In that sense, Lazio have made the best of a bad situation. Grade: B+ For Al-Hilal: Arguably the best signing made by a Saudi side this summer. Milinkovic-Savic is still only 28 and he is coming off the back of a fine season in Serie A. He's undoubtedly got at least another couple of great years left in him and he should prove the most dominant midfielder in the Pro League, especially as he'll have Ruben Neves alongside him. If Al-Hilal - who have already strengthened their defence with Kalidou Koulibaly - can now bring in a world-class attacker, they should start the new campaign as title favourites. Grade: A+ For Milinkovic-Savic: A desperately disappointing end to his hopes of proving himself a world-class player. He's long been good - we knew that as far back as 2018, when he was being linked with the likes of Manchester United, Juventus and Real Madrid. The question was, though, whether Milinkovic-Savic was truly great. Sadly, we'll never know, with the Serbia international set to spend his remaining peak years in Saudi Arabia when he could - and should - have spent at least one more season playing Champions League football. Still, at least he's going to earn plenty of money... Grade: D",
        image = 'section3image.png',
        order = 1
    )

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_sections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM sections")

    db.session.commit()
