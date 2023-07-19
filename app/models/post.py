from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)

    #relationships
    sections = db.relationship('Section', backref='post', cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='post')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "owner_first_name": self.owner.first_name,
            "owner_last_name": self.owner.last_name,
            "sections": [section.to_dict() for section in self.sections]
        }
