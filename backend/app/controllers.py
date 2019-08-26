from flask import Blueprint, request, jsonify, make_response
from flask_login import login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login_manager
from app.models import User, InvalidUsage 

from config import BASE_DIR

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


@users.route("/fblogin", methods=["POST"])
def fbSignUp():
    data = request.get_json()
    try:
        email = data["email"]
        name = data["name"]
    except:
        raise InvalidUsage("Informações faltando.", status_code=410)

    user = User.query.filter_by(email=email).first() 
    if user is None:
        user = User(email=email, name=name, pw_hash="", phone="", gender="Não informado", fb=True)
        db.session.add(user)
        db.session.commit()
    
    login_user(user)

    return jsonify(user.id)


@users.route("/login", methods=["POST"])
def login():

    data = request.get_json()
    try:
        email = data["email"]
        password = data["password"]
    except:
        raise InvalidUsage("Informações faltando.", status_code=410)

    user = User.query.filter_by(email=email).first()    
    if user is None:
        raise InvalidUsage("Usuário não encontrado.", status_code=410)
    
    if user.fb == True:
        raise InvalidUsage("Faça Login usando o botão do Facebook.", status_code=401)

    if check_password_hash(user.pw_hash, password):
        login_user(user)
        return jsonify(user.id)

    raise InvalidUsage("Usuário ou senha incorretos.", status_code=401)


@users.route("/profile/<int:id>", methods=["GET"])
@login_required
def getUser(id):
    try:
        user = User.query.filter_by(id=id).first()
    except:
        raise InvalidUsage("Erro ao procurar usuário.", status_code=410)
    userData = user.getProfile()
    return jsonify(userData)

@users.route("/profile/set", methods=["PUT"])
@login_required
def setData():

    data = request.get_json()
    user = current_user
    print(data)
    for key in data:
        try:
            if user.setAttributes(key, data[key]):
                db.session.commit()     
                continue
        except:
            raise InvalidUsage("Erro ao alterar dados. Atributo inexistente ou inalterável.", status_code=410)
    
    userData = user.getProfile()  
    return jsonify(userData)




@users.route("/logout", methods=["GET"])
@login_required
def logOut():

    try:
        logout_user()
        return "Logout feito com sucesso."
    except:
        raise InvalidUsage("Não foi possível fazer o Logout.", status_code=401)

@users.route("/get/session", methods=["GET"])
def getSession():

    try:    
        user = current_user
        data = user.getProfile()
    except:
        raise InvalidUsage("Usuário não está logado.", status_code=401)
    
    return jsonify(data)


@users.route("/terms", methods=["GET"])
@login_required
def terms():

    path = BASE_DIR+"\\Terms.txt"
    try:
        f = open(path, "r")
    except:
        raise InvalidUsage("Erro na aquisição dos termos.", status_code=410)
    
    text = f.read()
    
    data = {
        "terms": current_user.terms,
        "text": text
    }
    return jsonify(data)


@users.route("/check", methods=["GET"])
@login_required
def check():
    user = current_user
    print(user.getProfile())
    return "Está logado, " + str(user.name)


@users.route("/populate", methods=["GET"])
def populate():
    for i in range(10):
        email = "user"+str(i)
        name = "User "+str(i)
        password = generate_password_hash("user"+str(i))
        gender = "Não informado"
        phone = str(i)+str(i)+str(i)+str(i)+str(i)+str(i)+str(i)+str(i)
        user = User(email=email, name=name, pw_hash=password, gender=gender, phone=phone)
        db.session.add(user)
        db.session.commit()
    
    email = "admin"
    name = "admin"
    password = generate_password_hash("admin")
    gender = "Não informado"
    phone = "0"
    user = User(email=email, name=name, pw_hash=password, gender=gender, phone=phone) 
    db.session.add(user)
    db.session.commit()

    return "Sucesso"

