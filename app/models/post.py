from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.Text, nullable=False)
    heading = db.Column(db.Text, nullable=False)
    post = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)

    #relationships
    images = db.relationship('PostImage', backref='post')
    comments = db.relationship('Comment', backref='post')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'heading': self.heading,
            'post': self.post,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "owner_first_name": self.owner.first_name,
            "owner_last_name": self.owner.last_name
        }
