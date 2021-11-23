from operator import itemgetter
from flask import Blueprint, jsonify, request
from flask_login import login_required
from werkzeug.wrappers import request
from app.models import db, Post, Comment
from app.models import User
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)

today = datetime.now()

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# @post_routes.route('/<int:post_id>/comments')
# @login_required
# def comments(post_id):
#     # post = Post.query.get(post_id)
#     comments = Comment.query.filter(Comment.post_id == post_id).all()

#     return {comment.id:comment.to_dict() for comment in comments}

@post_routes.route('/')
@login_required
def users():
    posts = Post.query.all()
    # return {post.id:post.to_dict() for post in posts}
    postInfo = {}
    for post in posts:
        postInfo[post.id] = {}
        postInfo[post.id]['comments'] = {}
        comments = Comment.query.filter(Comment.post_id == post.id).order_by(Comment.created_at.desc()).all()
        postInfo[post.id]['id'] = post.id
        postInfo[post.id]['user_id'] = post.user_id
        postInfo[post.id]['caption'] = post.caption
        if comments:
            postInfo[post.id]['comments'] = {comment.id:comment.to_dict() for comment in comments}

    return postInfo


@post_routes.route('/<int:post_id>')
@login_required
def user(post_id):
    #get post and comments
    #post{ id: 1, user_id: 1, caption: 'test', comments:{ id:1, user_id:2, caption: 'test2 ...}}
    postInfo = {}
    postInfo['comments'] = {}
    post = Post.query.get(post_id)
    comments = Comment.query.filter(Comment.post_id == post_id).order_by(Comment.created_at.desc()).all()
    # print("TESTTEST",post)
    # print("$$$$$$$$$$$$$$$$$$", comments)
    postInfo['id'] = post.id
    postInfo['user_id'] = post.user_id
    postInfo['caption'] = post.caption
    if comments:
        postInfo['comments'] = {comment.id:comment.to_dict() for comment in comments}

    print(postInfo)
    return postInfo




@post_routes.route('/add', methods=['POST'])
@login_required
def add_post():

    form = PostForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        post = Post(
            user_id=form.data['user_id'],
            caption=form.data['caption'],
            created_at=today,
            updated_at=today
        )
        # post = Post(
        #     caption = form.data["caption"],
        #     user_id = form.data["user_id"],
        #     created_at=today,
        #     updated_at=today
        # )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_post(id):
    post = Post.query.get(id)

    form = PostForm()

    if form.validate_on_submit:
        post.caption=form.data['caption']
        db.session.commit()
        return "Edit Success!"
    else:
        return None

@post_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_post(id):
    print("DELETE TEST", id)
    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()

    return "Delete Check"

@post_routes.route('/<int:id>/addComment', methods=["POST"])
@login_required
def add_comment(id):
    form = CommentForm()
    if form.validate_on_submit:
        comment = Comment(
            user_id=form.data['user_id'],
            post_id=form.data['post_id'],
            caption=form.data['caption'],
            created_at=today,
            updated_at=today
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
