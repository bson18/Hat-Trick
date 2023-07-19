from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Section(db.Model):
    __tablename__ = 'sections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    section_heading = db.Column(db.Text, nullable=True)
    section = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.today, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'section_heading': self.section_heading,
            'section': self.section,
            'image': self.image,
            'order': self.order,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
