import React from 'react';
import { Link } from "react-router-dom"
import Axios from 'axios';
import { clearUserId } from './UserData';

import "./Terms.css";

class Terms extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            terms: false
        }
    }

    componentDidMount() {
        Axios.get("/api/terms")
        .then(response => {
            if (!response.data.terms) {
                let text = document.getElementById("terms")
                text.innerHTML = response.data.text
                text.style.textAlign = "justify"
                text.style.textJustify = "inter-word"
                text.style.padding = "0.5rem 1rem"
                text.style.border = "1px solid black"
                text.style.height = "18rem"
                text.style.overflowY = "scroll"
            } else {
                let text = document.getElementById("terms")
                text.innerHTML = "Você já aceitou os Termos e Condições"
                text.style.padding = "1rem 2rem"
                document.getElementById("form").innerHTML = ""
            }
        }).catch(error => {
            alert(error)
            // Axios.get("/api/logout")
            // clearUserId()
        })
    }

    handleCheckbox(e) {
        let value = false
        if (document.getElementById("checkbox").checked)
            value = true

        this.setState({
            terms: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        Axios.put("/api/profile/set", {
            terms: this.state.terms
        }).then((response) => {
            window.location.assign("/profile/"+String(response.data.id))
        }).catch(() => {
            alert("Algo deu errado.")
        })
    }

    render() {
        return (<div className="myForms">
            <h1>Termos e Condições</h1>
            <p id="terms" />
            <form onSubmit={this.handleSubmit} className="checkbox" id="form" >
                <label htmlFor="checkbox">Aceito os Termos e Condições</label>
                <input name="terms" onChange={this.handleCheckbox} type="checkbox" id="checkbox" />
                <div className="button-container">
                    <button>Enviar</button>
                </div>
            </form>
        </div>)
    }
}

export default Terms;



            