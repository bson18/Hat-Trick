from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helper import ALLOWED_EXTENSIONS

class PostImageForm(FlaskForm):
    image = FileField('image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
