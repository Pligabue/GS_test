import React from "react"
import axios from "axios"

import "./Login.css"
import {setUserId, clearUserId} from "./UserData"

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email: null,
            password: null,
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password,
        }).then(response => {
            setUserId(response.data)
            axios.get("/api/terms")
            .then(response => {
                if (!response.data.TandC)
                    window.location.assign("/terms")
                else
                    window.location.assign("/")
            }).catch(() => {
                axios.get("/api/logout")
                clearUserId()
            })
        }).catch(error => { 
            alert("Login não pode ser feito. ", error.message)
            clearUserId()
        })
    }

    render() {
        return(<div className="myForms">
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input type="email" name="email" placeholder="email@address.com" id="email" onChange={this.handleChange} />
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onChange={this.handleChange} />
                <div className="button-container">
                    <button>Log In</button>
                </div>
            </form>   
        </div>)
    }
} export default Login