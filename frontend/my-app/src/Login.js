import React from "react"
import Axios from "axios";

import "./Login.css"


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.FBlogin = this.FBlogin.bind(this)
        this.state = {
            email: null,
            password: null,
        }
    }

    componentDidMount() {
        
        window.fbAsyncInit = function() {
            window.FB.init({
            appId      : '732327073884712',
            cookie     : true,
            xfbml      : true,
            version    : 'v4.0'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    
    FBlogin() {
        window.FB.login(response => {
            if (response.status === "connected")
                window.FB.api('/me', {fields: 'name, middle_name, email'}, function(response) {
                    Axios.post("/api/fblogin", {
                        email: response.email,
                        name: response.name
                    }).then(response => {
                        window.location.assign("/profile/"+String(response.data))
                    }).catch(error => {
                        alert("Não foi possível fazer login utilizando o Facebook. ", error.message)
                        window.FB.logout()
                    });
                });
        }, {
            scope: 'email, public_profile', 
            return_scopes: true
        })       
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        Axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password,
        }).then(response => {
            window.location.assign("/profile/"+String(response.data))
        }).catch(error => { 
            alert("Login não pode ser feito. ", error.message)
        })
    }

    render() {
        return(<div className="myForms">
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input type="text" name="email" placeholder="email@address.com" id="email" onChange={this.handleChange} />
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onChange={this.handleChange} />
                <div className="button-container">
                    <button>Log In</button>
                </div>
            </form>  
            <div className="border" />
            <button className="fb-button" onClick={this.FBlogin}>Login with Facebook</button>
        </div>)
    }
} export default Login