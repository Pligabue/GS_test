from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash

from app import db
from app.models import User, InvalidUsage 

users = Blueprint("users", __name__)

@users.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@users.route("/signup", methods=["POST"])
def signUp():
    data = request.get_json()
    try:
        email = data["email"]
        name = data["name"]
        password = generate_password_hash(data["password"])
        gender = data["gender"]
        phone = data["phone"]
    except:
        raise InvalidUsage("Algo deu errado na inscrição do usuário.", status_code=410)

    newUser = User(email=email, name=name, pw_hash=password, gender=gender, phone=phone)
      
    try:
        db.session.add(newUser)
        db.session.commit()
    except:
        raise InvalidUsage("Erro na persistência dos dados no banco.", status_code=410)
        
    return "Sucesso na inscrição do usuário."


@users.route("/fbsignup", methods=["POST"])
def fbSignUp():
    return

@users.route("/profile/<int:id>", methods=["GET"])
def getUser(id):
    try:
        user = User.query.filter_by(id=id).first()
    except:
        raise InvalidUsage("Erro ao procurar usuário.", status_code=410)
    userData = user.getProfile()
    return jsonify(userData)

@users.route("/profile/<int:id>/set", methods=["PUT"])
def setData(id):

    data = request.get_json()
    for key in data:

        try:
            user = User.query.filter_by(id=id).first()
        except:
            raise InvalidUsage("Erro ao procurar usuário.", status_code=410)
        
        try:
            if user.setAttributes(key, data[key]):
                db.session.commit() 
                userData = user.getProfile()      
                return jsonify(userData)
        except:
            raise InvalidUsage("Erro ao alterar dados. Atributo inexistente ou inalterável.", status_code=410)
    
    raise InvalidUsage("Erro ao alterar dados. Atributo inexistente ou inalterável.", status_code=410)

