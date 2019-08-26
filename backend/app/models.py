from app import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pw_hash = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(40), nullable=False)
    sports = db.Column(db.String(40))
    music = db.Column(db.String(40))
    travel = db.Column(db.String(40))
    terms = db.Column(db.Boolean, default=False)
    fb = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)

    def getProfile(self):
        data = {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "gender": self.gender,
            "sports": self.sports,
            "music": self.music,
            "travel": self.travel,
            "phone": self.phone,
            "terms": self.terms,
            "fb": self.fb,
            "admin": self.admin
        }
        return data

    def setAttributes(self, key, value):
        if key == "sports" or key == "music" or key == "travel" or key == "phone" or key == "terms" or key == "gender":
            setattr(self, key, value)
            return True
        return False
        
        


class InvalidUsage(Exception):
    
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

