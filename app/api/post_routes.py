from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Post, PostImage
from app.forms import PostForm, PostImageForm
from sqlalchemy import func
from .AWS_helper import upload_file_to_s3, remove_file_from_s3, get_unique_filename

post_routes = Blueprint('posts', __name__)

#Get all posts
@post_routes.route('', methods = ['GET'])
def get_all_posts():
    posts = Post.query.all()
    return {"all_posts": {post.id: post.to_dict() for post in posts}}


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

    image_form = PostImageForm()
    image_form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit() and image_form.validate_on_submit():
        print("Form validation successful")
        post = Post(
            owner_id = current_user.id,
            title = form.data['title'],
            heading = form.data['heading'],
            post = form.data['post'],
            created_at = func.now()
        )
        # print(post)
        db.session.add(post)
        db.session.commit()

        if 'images' in request.files:
            images = request.files.getlist('images')
            for image in images:
                if image:
                    try:
                        filename = get_unique_filename(image.filename)
                        res = upload_file_to_s3(image, filename)

                        if 'url' in res:
                            image_url = res['url']

                            post_image = PostImage(
                                post_id=post.id,
                                image=image_url,
                                created_at=func.now(),
                                updated_at = func.now()
                            )
                            db.session.add(post_image)
                        else:
                            return {"message": "Failed to upload image"}, 500
                    except Exception as e:
                        return {"message": str(e)}, 500

        db.session.commit()

        return {"post": post.to_dict(), "post_image": post_image.to_dict()}
    else:
        print("Form validation failed")
        form_errors = form.errors
        image_form_errors = image_form.errors

        print("Form errors: ", form_errors)
        print("Image form errors: ", image_form_errors)
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
