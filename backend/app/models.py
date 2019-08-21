from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(40), nullable=False)
    sports = db.Column(db.String(40))
    music = db.Column(db.String(40))
    travel = db.Column(db.String(40))

