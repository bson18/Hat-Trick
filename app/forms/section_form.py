from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.AWS_helper import ALLOWED_EXTENSIONS

class SectionForm(FlaskForm):
    section_heading = TextAreaField('section_heading', validators=[DataRequired()])
    section = TextAreaField('section', validators=[DataRequired()])
    image = FileField('image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    order = IntegerField('order', validators=[DataRequired()])
