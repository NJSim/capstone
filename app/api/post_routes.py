from operator import itemgetter
from flask import Blueprint, jsonify, request
from flask_login import login_required
from werkzeug.wrappers import request
from app.forms.like_form import LikeForm
from app.models import db, Post, Comment
from app.models import User
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm
from datetime import datetime
from collections import Counter

from app.models.like import Like

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
    posts = Post.query.order_by(Post.id.desc()).all()
    # return {post.id:post.to_dict() for post in posts}
    postInfo = {}
    for post in posts:
        postInfo[post.id] = {}
        postInfo[post.id]['comments'] = {}
        comments = Comment.query.filter(Comment.post_id == post.id).order_by(Comment.created_at.desc()).limit(5).all()
        allComments = Comment.query.filter(Comment.post_id == post.id).order_by(Comment.created_at.desc()).all()
        print(len(comments))
        postInfo[post.id]['id'] = post.id
        user = User.query.filter(User.id == post.user_id).first()
        postInfo[post.id]['user_id'] = user.to_dict()
        # print("user print test",user)
        postInfo[post.id]['caption'] = post.caption
        postInfo[post.id]['url'] = post.url
        likes = Like.query.filter(Like.post_id == post.id).all()
        postInfo[post.id]['likes'] = {like.user_id:like.to_dict() for like in likes}
        postInfo[post.id]['likesLength'] = len(likes)
        if comments:
            postInfo[post.id]['comments'] = {comment.id:{
            'id': comment.id,
            'user_id': User.query.filter(User.id == comment.user_id).first().to_dict(),
            'post_id': comment.post_id,
            'caption': comment.caption,
        } for comment in comments}

            postInfo[post.id]['commentsLength'] = len(allComments)

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
    postInfo['url'] = post.url
    likes = Like.query.filter(Like.post_id == post.id).all()
    postInfo['likes'] = {like.user_id:like.to_dict() for like in likes}
    postInfo['likesLength'] = len(likes)
    if comments:
        postInfo['comments'] = {comment.id:{
            'id': comment.id,
            'user_id': User.query.filter(User.id == comment.user_id).first().to_dict(),
            'post_id': comment.post_id,
            'caption': comment.caption,
        } for comment in comments}
        postInfo['commentsLength'] = len(comments)

    print(postInfo)
    return postInfo

@post_routes.route('/query/<query>')
def get_query(query):
    users = User.query.filter(User.username.ilike(f'%{query}%')).all()
    if (users):

        findQuery = {user.id: user.username for user in users}
        return findQuery
    return {}


@post_routes.route('/add', methods=['POST'])
@login_required
def add_post():

    form = PostForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        post = Post(
            user_id=form.data['user_id'],
            caption=form.data['caption'],
            url=form.data['url'],
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

@post_routes.route('/<int:post_id>/<int:user_id>/like', methods=['POST'])
@login_required
def add_like(post_id, user_id):

    like = Like.query.filter(Like.post_id == post_id, Like.user_id == user_id).first()
    print("PRINT TEST LIKE",like)
    if (like):
        return None

    form = LikeForm()

    if form.validate_on_submit:
        newLike = Like(
            user_id=form.data['user_id'],
            post_id=form.data['post_id'],
            created_at=today,
            updated_at=today
        )
        db.session.add(newLike)
        db.session.commit()
        return newLike.to_dict()
    else:
        return None
    # newLike = Like(
    #     user_id=user_id,
    #     post_id=post_id,
    #     created_at=today,
    #     updated_at=today
    # )
    # db.session.add(newLike)
    # db.session.commit()
    # return "successful like"

@post_routes.route('/<int:post_id>/<int:user_id>/like', methods=['DELETE'])
@login_required
def delete_like(post_id, user_id):

    like = Like.query.filter(Like.post_id == post_id, Like.user_id == user_id).first()
    db.session.delete(like)
    db.session.commit()

    return "Delete Like Check"




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
    # print("DELETE TEST", id)
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

@post_routes.route('/<int:id>/<int:comment_id>/editComment', methods=["PUT"])
@login_required
def edit_comment(id, comment_id):
    comment = Comment.query.get(comment_id)

    form = CommentForm()

    if form.validate_on_submit:
        comment.caption=form.data['caption']
        db.session.commit()
        return "Edited Comment Success"
    else:
        return None

@post_routes.route('/<int:id>/<int:comment_id>/deleteComment', methods=["DELETE"])
@login_required
def delete_comment(id, comment_id):
    print("DELETE TEST", comment_id)
    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return "Delete Comment Check"
