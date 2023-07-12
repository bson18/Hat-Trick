from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Post
from app.forms import PostForm
from sqlalchemy import func

post_routes = Blueprint('posts', __name__)

#Get all posts
@post_routes.route('/', methods = ['GET'])
def get_all_posts():
    posts = Post.query.all()
    return [post.to_dict() for post in posts]


#Get single post
@post_routes.route('/<int:id>', methods = ['GET'])
def get_single_post(id):
    post = Post.query.get(id)
    return post.to_dict()


#Create new post
@post_routes.route('/new', methods = ['POST'])
def create_post():
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            owner_id = current_user.id,
            title = form.data['title'],
            heading = form.data['heading'],
            post = form.data['post'],
            createdAt = func.now()
        )

        db.session.add(post)
        db.session.commit()

        return post.to_dict()
    return {"message": "Bad Request"}, 400


#Update post
@post_routes.route('/<int:id>', methods = ['POST'])
def update_post(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    post = Post.query.get(id)

    if not post:
        return {"message": "Article not found"}, 404

    if not post.owner_id == current_user.id:
        return {"message": "Forbidden"}, 403

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.title = form.data['title']
        post.heading = form.data['heading']
        post.post = form.data['post']
        post.updated_at = func.now()

        db.session.commit()

        return post.to_dict()
    return {"message": "Bad Request"}, 400


#Delete post
@post_routes.route('/<int:id>', methods = ['POST'])
def delete_post(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    post = Post.query.get(id)

    if not post:
        return {"message": "Article not found"}, 404

    if not post.owner_id == current_user.id:
        return {"message": "Forbidden"}, 403

    db.session.delete(post)
    db.session.commit()

    return {"message": "Successfully deleted"}
