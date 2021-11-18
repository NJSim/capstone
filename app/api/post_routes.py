from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def users():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:post_id>')
@login_required
def user(post_id):
    post = Post.query.get(post_id)
    return post.to_dict()
