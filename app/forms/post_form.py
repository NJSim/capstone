from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class PostForm(FlaskForm):
    user_id = StringField("user_id", validators = [DataRequired()])
    caption = TextAreaField("caption", validators = [DataRequired()])
