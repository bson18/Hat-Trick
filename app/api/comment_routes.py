from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from sqlalchemy import func

comment_routes = Blueprint('comments', __name__)

#Update comment
@comment_routes.route('/<int:id>', methods = ['POST'])
@login_required
def update_comment(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    comment = Comment.query.get(id)

    if not comment:
        return {"message": "Comment not found"}, 404

    if comment.user_id != current_user.id:
        return {"message": "Forbidden"}, 403

    if request.method =="POST":
        data = request.get_json()
        updated_comment = data.get('comment')
        comment.comment = updated_comment
        comment.updated_at = func.now()
        db.session.commit()
        return comment.to_dict()
    else:
        return {"message": "Bad Request"}, 400


#Delete comment
@comment_routes.route('/<int:id>/delete', methods = ['POST'])
@login_required
def delete_comment(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    comment = Comment.query.get(id)

    if not comment:
        return {"message": "Comment not found"}, 404

    if comment.user_id != current_user.id:
        return {"message": "Forbidden"}, 403

    db.session.delete(comment)
    db.session.commit()
    return {"message": "Successfully Deleted"}
