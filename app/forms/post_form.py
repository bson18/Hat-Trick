from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length

class PostForm(FlaskForm):
    title = TextAreaField('title', validators=[DataRequired(), Length(max=500)])
