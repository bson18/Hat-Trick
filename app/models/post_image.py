from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #columns
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)

    #relationships


    #methods
    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'image': self.image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
