from datetime import timezone
from sqlalchemy.orm import relationship
from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.Text)
    url = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    user = relationship("User", back_populates="posts")
    comments = db.relationship("Comment", cascade="all, delete, delete-orphan", lazy=True)
    likes = db.relationship("Like", cascade="all, delete, delete-orphan", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'url': self.url
        }
