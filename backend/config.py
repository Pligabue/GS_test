import os

BASE_DIR = os.path.abspath("")

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'myDB.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = os.urandom(16)

SOCIAL_FACEBOOK = {
    'consumer_key': 'facebook app id',
    'consumer_secret': 'facebook app secret'
}