import React from "react"
import axios from "axios"

import "./SignUp.css"

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email: null,
            name: null,
            gender: null,
            phone: null,
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
        axios.post("/api/signup", {
            email: this.state.email,
            name: this.state.name,
            gender: this.state.gender,
            phone: this.state.phone,
            password: this.state.password,
        }).then(response => {
            alert("Usuário cadastrado com sucesso.")
            window.location.reload()
        }).catch(error => { 
            alert("Usuário não pode ser cadastrado. ", error.message)
        })
    }

    render() {
        return(<div className="myForms">
            <h1>Cadastro</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" placeholder="Nome" id="name" onChange={this.handleChange} />
                <label htmlFor="email">E-mail:</label>
                <input type="email" name="email" placeholder="email@address.com" id="email" onChange={this.handleChange} />
                <label htmlFor="phone">Telefone:</label>
                <input type="phone" name="phone" id="phone" onChange={this.handleChange} />
                <label htmlFor="password">Genêro:</label>
                <select name="gender" onChange={this.handleChange} defaultValue="default" >
                    <option disabled value="default">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Não informado">Não desejo informar</option>
                </select>
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onChange={this.handleChange} />
                <div className="button-container">
                    <button>Cadastrar</button>
                </div>
            </form>
        </div>)
    }
} export default SignUp