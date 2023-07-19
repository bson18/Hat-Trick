from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'comment': self.comment,
            'post_id': self.post_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name
        }
