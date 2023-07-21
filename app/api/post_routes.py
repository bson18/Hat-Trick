from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Post, Section, Comment
from app.forms import PostForm, SectionForm, CommentForm
from sqlalchemy import func
from .AWS_helper import upload_file_to_s3, remove_file_from_s3, get_unique_filename
import json

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

    form = PostForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        print("Form validation successful")
        post = Post(
            owner_id = current_user.id,
            title = form.data['title'],
            created_at = func.now()
        )
        # print(post)
        db.session.add(post)
        db.session.flush()

        num_sections = int(request.form.get('num_sections', 0))

        for i in range(1, num_sections + 1):
            print("In section loop")
            section_heading = request.form.get(f'section_{i}_section_heading')
            section_content = request.form.get(f'section_{i}_section')
            image = request.files.get(f'section_{i}_image')
            if section_heading and section_content and image:
                try:
                    image.filename = get_unique_filename(image.filename)
                    upload = upload_file_to_s3(image)
                    image_url = upload['url']

                    section = Section(
                        post_id = post.id,
                        section_heading = section_heading,
                        section = section_content,
                        image = image_url,
                        order=i
                    )
                    db.session.add(section)
                except Exception as e:
                    return {"message": str(e)}, 500
        db.session.commit()
        return post.to_dict()
    else:
        print("Form validation failed")
        form_errors = form.errors

        print("Form errors: ", form_errors)
    return {"message": "Bad Request", "form_errors": form_errors}, 400


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

    form = PostForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.title = form.data['title']
        post.updated_at = func.now()

        for section in post.sections:
            section_heading = request.form.get(f'section_{section.id}_section_heading')
            section_content = request.form.get(f'section_{section.id}_section')
            # image = request.files.get(f'section_{section.id}_image')

            section.section_heading = section_heading
            section.section = section_content
            # if image:
            #     try:
            #         image.filename = get_unique_filename(image.filename)
            #         upload = upload_file_to_s3(image)
            #         image_url = upload['url']
            #         section.image=image_url
            #     except Exception as e:
            #         return {"message": str(e)}, 500

        # num_sections = int(request.form.get('num_sections', 0))

        # existing_section_ids = set()
        # for section in post.sections:
        #     existing_section_ids.add(section.id)

        # for i in range(1, num_sections + 1):
        #     section_id = request.form.get(f'section_{i}_id')
        #     section_heading = request.form.get(f'section_{i}_section_heading')
        #     section_content = request.form.get(f'section_{i}_section')
        #     image = request.files.get(f'section_{i}_image')

        #     if section_id:
        #         section = Section.query.get(section_id)

        #         if section:
        #             section.section_heading = section_heading
        #             section.section = section_content
        #             if image:
        #                 try:
        #                     image.filename = get_unique_filename(image.filename)
        #                     upload = upload_file_to_s3(image)
        #                     image_url = upload['url']
        #                     section.image = image_url
        #                 except Exception as e:
        #                     return {"message": str(e)}, 500
        #     else:
        #         if section_heading and section_content and image:
        #             try:
        #                 image.filename = get_unique_filename(image.filename)
        #                 upload = upload_file_to_s3(image)
        #                 image_url = upload['url']

        #                 section = Section(
        #                     post_id=post.id,
        #                     section_heading=section_heading,
        #                     section=section_content,
        #                     image=image_url,
        #                     order=i
        #                 )
        #                 db.session.add(section)
        #             except Exception as e:
        #                 return {"message": str(e)}, 500
        #     if section_id:
        #         existing_section_ids.remove(section_id)

        # for section_id in existing_section_ids:
        #     section = Section.query.get(section_id)
        #     db.session.delete(section)

        db.session.commit()

        return post.to_dict()
    else:
        form_errors = form.errors
        return {"message": "Bad Request", "form_errors": form_errors}, 400


#Delete post
@post_routes.route('/<int:id>/delete', methods = ['POST'])
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


#Get all comments by post id
@post_routes.route('/<int:id>/comments', methods = ['GET'])
def get_all_comments(id):
    post = Post.query.get(id)
    comments = Comment.query.filter_by(post_id=id).all()
    return [comment.to_dict() for comment in comments]


#Create comment
@post_routes.route('/<int:id>/comments', methods = ['POST'])
@login_required
def create_comment(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    post = Post.query.get(id)
    if not post:
        return {"message": "Post not found"}, 404

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            comment=data['comment'],
            post_id=id,
            created_at=func.now()
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
    return {"message": "Bad Request", "form_errors": form.errors}, 400
