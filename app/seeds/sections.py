from app.models import db, Section, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_sections():
    section1 = Section(
        post_id=1,
        section_heading = "The France international is the best player in the world, but he's become more trouble than he's worth",
        section = "So, here we go again, then. Another episode in football's longest-running soap opera, starring Kylian Mbappe and Paris Saint-Germain. But surely this is the final season? Surely this can't go on any longer? Surely both parties will realise that they're better off without one another? The penny finally dropped for Leonardo at the beginning of July - albeit too late to keep him in a job. The Brazilian spent three seasons working with Mbappe at PSG before being sacked as sporting director last summer - and has only recently realised that the forward's ego is too big for Parc des Princes. \"For the good of PSG, I think the time has come for Mbappe to go, no matter what,\" Leonardo told L'Equipe. \"Paris-Saint-Germain existed before Kylian Mbappe and it will exist after him. He's been in Paris for six years and, over those six seasons, five different clubs have won the Champions League (Real Madrid in 2018 and 2022, Liverpool in 2019, Bayern Munich in 2020, Chelsea in 2021 and Manchester City in 2023), none of which had Mbappe in their ranks. That means it's entirely possible to win this competition without him.\"",
        image = 'https://hat-trick-bson.s3.us-east-2.amazonaws.com/be3cb5d887204b08967030d64bf79dbe.png',
        order = 1
    )

    section4 = Section(
        post_id=1,
        section_heading= "Things could quickly turn bad",
        section = "Mbappe had just come off the bench to score a hat-trick in PSG's Champions League win over Club Brugge - and yet Dugarry was deeply concerned. \"I'm afraid the dream could be broken with this boy; I feel that things could quickly turn bad,\" the former France international told RMC. While nearly everyone else was focusing on the latest thrilling demonstration of Mbappe's prodigious talent, Dugarry was preoccupied with the forward's post-match comments. Mbappe made it clear that he had both wanted and expected to start the game in Belgium. He acknowledged \"It's the coach's decision and you have to accept it.\" But then immediately added, \"I wanted to show again that it's hard to do without me.\" He certainly proved his point. And his desire to make his presence felt was interpreted by most pundits as the attitude of a true champion; that unwavering confidence in his own ability and the belief that he should always be on the field. Dugarry, though, saw something else: a burgeoning sense of entitlement. He feared that the teenager, who had once skipped a title-winning party at Monaco to get sufficient sleep, was in danger of becoming a prima donna at PSG.",
        image = 'https://hat-trick-bson.s3.us-east-2.amazonaws.com/f98092ffaa6a4825a54d6ead90850737.png',
        order = 2
    )

    section5 = Section(
        post_id=1,
        section_heading = "A 'war of egos'",
        section = "He predicted a \"war of egos\" at Parc des Princes if Mbappe was allowed to grow unchecked - and he was spot on, with the winger's colossal personality clash with Neymar creating a massive divide in the PSG dressing room last season. The situation became so ridiculous that the pair even squabbled over a spot-kick during the Ligue 1 meeting with Montpellier last August. In the same game, Mbappe also petulantly - and unforgivably - turned his back on the play simply because he hadn't received the ball from Vitinha. Mbappe's very public frustration with his employers was of far greater significance, though.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/3e39bf09cec1465c815e85c8be3bf2fe.png",
        order = 3
    )

    section2 = Section(
        post_id=2,
        section_heading = "Wayne Rooney believes Declan Rice has to be the \"leader\" after Arsenal paid a club-record transfer fee of £105m ($137m) to sign him from West ham.",
        section = "WHAT HAPPENED? The England international proved his mettle after starring in the Gunners' 5-0 win over MLS All-Stars on Wednesday, which was their first friendly in the United States. DC United coach Rooney, who was in charge of the MLS team, was impressed with Rice and backed him to be a \"huge player\" at the Emirates.",
        image = 'https://hat-trick-bson.s3.us-east-2.amazonaws.com/6953ad0813be4aa195ab44032c2d0a6e.png',
        order = 1
    )

    section6 = Section(
        post_id=2,
        section_heading = "WHAT THEY SAID:",
        section = "\"I think could be the one who could... well, he has to be the leader now, really, I think of that Arsenal team,\" he told the Press Association. \"I saw Frank Lampard saying he felt Declan could be the Chelsea captain for the next 10 years if he went there. I think he can do that [for Arsenal] and he seems to have that character and I believe he will be a huge player for Arsenal,\" he added.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/06e3beee002445c6ac29a258e3ad0413.png",
        order = 2
    )

    section7 = Section(
        post_id=2,
        section_heading = "THE BIGGER PICTURE:",
        section = "Former Arsenal manager Arsene Wenger has also put his weight behind Rice and insisted that Arsenal have the potential to win the 2023-24 Premier League after landing the midfielder. The Gunners have revamped their squad and have also made major signings such as Kai Havertz and Jurrien Timber as well as the 24-year-old.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/3573511abac14036a723d0bc3d4bcbc2.png",
        order = 3
    )

    section3 = Section(
        post_id=3,
        section_heading = "The 21-year-old has not played for the club since he was arrested in January 2022, and his future remains unclear",
        section = "As it stands, Mason Greenwood is still a Manchester United player. He was included on their retained list for the 2023-24 season, and remains under contract until 2025. However, United are still in the process of completing an internal investigation to decide Greenwood's future. He was suspended by the club after being arrested on suspicion of rape and assault on January 30, 2022. In October, Greenwood was arrested again over allegations he'd breached his bail conditions, and was subsequently charged with attempted rape, assault occasioning actual bodily harm, and controlling and coercive behaviour. Greenwood was re-bailed at Manchester Minshull Street Crown Court a month later and his trial date was set for November 2023. But on February 2, the Crown Prosecution Service announced that all charges against him had been dropped. A few hours later, United released the following statement: \"Manchester United notes the decision of the Crown Prosecution Service that all charges against Mason Greenwood have been dropped. The club will now conduct its own process before determining next steps. We will not make any further comment until that process is complete.\" With the new season fast approaching, United are yet to conclude their investigation, but The Sun has reported that a decision will be made before the end of July.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/65a4923cd09841d081eb6f38b6108862.png",
        order = 1
    )

    section8 = Section(
        post_id=3,
        section_heading = "Man Utd staff 'split'",
        section = "According to The Guardian, United staff were \"split\" on whether Greenwood should be allowed to resume his career at Old Trafford when the internal investigation began. Some felt the club owed him a \"duty of care\" given the fact he has been on their books since the age of seven. However, the report also stated that a \"substantial portion\" of staff \"would be deeply unhappy\" if Greenwood were to wear the famous red shirt again. Meanwhile, United manager Erik ten Hag was asked how he planned to deal with the situation. \“It's really important but sometimes you get issues,” he told reporters. “Then as a club and team you have to deal with it. We have standards and values. We have to live along those high standards and values and that gives a base if you have a good culture and spirit. That's our job, not to get distracted by anything. We are human beings and sometimes there are issues, we are not like robots, but we have to focus on our job.\"",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/6eccea773146459a9c925198b8e54bff.png",
        order = 2
    )

    section9 = Section(
        post_id=3,
        section_heading = "TV interview & therapy",
        section = "By the start of March, United had begun mapping out a \"phased process\" for Greenwood's reintegration into the first-team squad as they considered all of their options - according to The Athletic. This included encouraging the player to undertake a form of therapy, before a potentially more comprehensive rehabilitation. The report added that Greenwood could also be challenged publicly on the events of the previous 18 months in a television interview. However, it was also stressed that this was merely one possibility, and that a parting of ways was also still under consideration.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/09e6197385884d8bb1c23a30835da5bc.png",
        order = 3
    )

    section10 = Section(
        post_id=4,
        section_heading = "Vinicius Jr is reportedly looking to following in the footsteps of Cristiano Ronaldo, Sergio Ramos and Karim Benzema as Real Madrid's penalty taker.",
        section = "WHAT HAPPENED? The Brazil international has forged his own reputation as a global superstar while at Santiago Bernabeu, with 45 goals recorded across the last two seasons - including a winning effort in the 2022 Champions League final.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/f27c64e5c7ec4ef9b715a73e574a1a5c.png",
        order = 1
    )

    section11 = Section(
        post_id=4,
        section_heading = "THE BIGGER PICTURE:",
        section = "Vinicius has rarely been given a sniff of spot-kick duty while at Real, but that situation may be about to change. Free-scoring French striker Benzema has left for Al-Ittihad, meaning that somebody else is required to take over from 12 yards in 2023-24.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/9b254760be474cc3a3578070dae15d4b.webp",
        order = 2
    )

    section12 = Section(
        post_id=4,
        section_heading = "AND WHAT'S MORE:",
        section = "Five-time Ballon d'Or winner Ronaldo used to take on that responsibility, and he scored 80 of the 94 penalties that he took for Real (a conversion rate of 85.1%). Legendary former skipper Ramos then took over - with the iconic defender once scoring 25 spot-kicks in a row, while ending his spell in Madrid with 30 of 35 efforts converted (87.5%). Benzema hit the net with 29 of his 35 penalties (82.85%), with Vinicius having never taken a competitive spot-kick for club or country.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/6e902323d8534ddb9945f2165133036b.webp",
        order = 3
    )

    section13 = Section(
        post_id=5,
        section_heading = "The seven-time Ballon d'Or winner made the perfect start to life in the United States with a stunning stoppage-time strike",
        section = "It was always going to be like this. Of course, Lionel Messi would come on in the second half. Of course, he would get a chance to take a last-minute free-kick with the game on the line. Of course, he would find that one sliver of net out of reach of the opposing goalkeeper. And, of course, it would hand Inter Miami a 2-1 win. Here was the debut of dreams, the perfect introduction to American soccer for Messi. The score, in a sense, wasn't really going to matter here. It was clear in the celebrities that lined the pitch, in the Argentina kits in the crowds, in the tifo unveiled before kick-off: This was Messi's introduction to the United States, not necessarily a football match. Fortunately, there was a lot to like about this contest as a sporting event. Both sides had their chances in the early stages, with Cruz Azul hitting the post and Miami peppering the visitors' goal. The home side were rewarded for their pressure, with Robert Taylor pinging a shot in off the post to give his side the lead on the stroke of half-time. But the Messi chants that rang around DRV PNK Stadium from the first minute showed that it was only about one man. And the home fans were graced with 35 minutes of the Argentine, who swiftly inherited the captain's armband. His impact was almost immediate, a weaving run and quick interchange within 60 seconds of his arrival on the Florida turf. He could do little to stop Cruz Azul's equaliser, though, as Uriel Antuna leveled things with a lashed effort. Then, in the 93rd minute, Messi had his moment. He was clattered on the edge of the box, found the back of the net by obligation, completing the sort of dream debut — one that somehow also seemed inevitable.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/f0346994aa1449bd99c84cec5657d23d.webp",
        order = 1
    )

    section14 = Section(
        post_id=5,
        section_heading = "Messi has still got it",
        section = "That's more or less how it works these days. Messi is now a player who operates in moments. He scores free-kicks, finds neat assists, makes the very complex look simple. He no longer dominates games as much as he raises them, occasionally popping up with the spectacular as a reminder that the greatest to ever do it is indeed on the pitch. Most of the familiar Messi things were here. The Argentine enjoyed the normal slew of weaving runs and dips of a shoulder. He cut between defenders, found angles that didn't exist, and offered some much-needed sharpness in the final third. But there were also less impressive moments. Messi had the audacity to lose the ball once or twice, while his 36-year-old legs offered little help in Cruz Azul's rapid transitions. These are the things that Inter Miami will have to adapt to, the faults they will need to fix if they are to turn their season around. Those free-kicks won't come every night, or every game. But on Friday, it was perfect.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/942add657d654eee97080101d82d2fd8.webp",
        order = 2
    )

    section15 = Section(
        post_id=5,
        section_heading = "Busquets bosses it",
        section = "There was also a debut for another big-name signing, as Sergio Busquets had the misfortune to be subbed on after Messi, his arrival met with some respectful cheers and generous applause — a far cry from the screams that greeted the previous new signing. And he was arguably more impactful than the Argentine. Miami had lost control of the midfield before Busquets entered the game, Cruz Azul playing through their triumvirate far too easily. And Busquets, in signature style, filled some of those gaps. He no longer has the legs to cover space like he used to, and gets exposed in transition these days. But his positional awareness and calmness on the ball was vital. He linked up with Messi on a number of occasions, as his passing as reliable as ever. There was one crunching tackle, a few sneaky fouls that weren't whistled, and plenty of diagonal balls. He doesn't bring the same spectacle as Messi, but he might just be as important this side.",
        image = "https://hat-trick-bson.s3.us-east-2.amazonaws.com/154512bf2737488eb1d1dfba93bc2add.webp",
        order = 3
    )

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.add(section5)
    db.session.add(section6)
    db.session.add(section7)
    db.session.add(section8)
    db.session.add(section9)
    db.session.add(section10)
    db.session.add(section11)
    db.session.add(section12)
    db.session.add(section13)
    db.session.add(section14)
    db.session.add(section15)
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
