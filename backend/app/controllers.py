from flask import Blueprint, request, jsonify, make_response
from flask_login import login_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login_manager
from app.models import User, InvalidUsage 

users = Blueprint("users", __name__)

@users.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

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
@login_required
def setData(id):

    data = request.get_json()
    user = current_user
    
    if user.id != id:
        raise InvalidUsage("Você não tem permissão para fazer essa alteração.", status_code=401)

    for key in data:

        try:
            if user.setAttributes(key, data[key]):
                db.session.commit() 
                userData = user.getProfile()      
                return jsonify(userData)
        except:
            raise InvalidUsage("Erro ao alterar dados. Atributo inexistente ou inalterável.", status_code=410)
    
    raise InvalidUsage("Erro ao alterar dados. Atributo inexistente ou inalterável.", status_code=410)



@users.route("/login", methods=["POST"])
def login():

    data = request.get_json()
    print(data)
    try:
        email = data["email"]
        password = data["password"]
        user = User.query.filter_by(email=email).first()
    except:
        raise InvalidUsage("Usuário não encontrado.", status_code=410)
    
    print(user.getProfile())
    
    if check_password_hash(user.pw_hash, password):
        login_user(user)
        return "Sucesso"

    raise InvalidUsage("Usuário ou senha incorretos.", status_code=401)

@users.route("/check", methods=["GET"])
@login_required
def check():
    user = current_user
    print(user.getProfile())
    return "Está logado, " + str(user.name)
