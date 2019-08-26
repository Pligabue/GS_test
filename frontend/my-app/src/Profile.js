import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import Axios from 'axios';
import "./Profile.css"


class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            profileId: this.props.match.params.id,
            isLoggedIn: this.props.isLoggedIn,
            id: this.props.id,
            terms: this.props.terms
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                profileId: this.props.match.params.id,
                isLoggedIn: this.props.isLoggedIn,
                id: this.props.id,
                terms: this.props.terms
            })
        }
    }

    componentDidMount() {
        if (this.state.terms)
            Axios.get("/api/profile/"+this.state.profileId)
            .then(response => {
                let name = document.getElementById("name")
                name.innerHTML = response.data.name
                
                let email = document.getElementById("email")
                email.innerHTML = response.data.email

                let phone = document.getElementById("phone")
                phone.innerHTML = response.data.phone
                
                let gender = document.getElementById("gender")
                gender.innerHTML = response.data.gender

                let sports = document.getElementById("sports")
                if (response.data.sports == null)
                    sports.innerHTML = ""
                else    
                    sports.innerHTML = response.data.sports
                
                let music = document.getElementById("music")
                if (response.data.music == null)
                    music.innerHTML = ""
                else    
                    music.innerHTML = response.data.music

                let travel = document.getElementById("travel")
                if (response.data.travel == null)
                    travel.innerHTML = ""
                else    
                    travel.innerHTML = response.data.travel

                if (Number(this.state.profileId) === this.state.id) {
                    let buttonContainer = document.getElementById("button-container")
                    let button = document.createElement("button")
                    button.id = "button"
                    button.innerHTML = "Editar"
                    buttonContainer.appendChild(button)
                    BuildOnClick(this.handleChange, this.handleSubmit)
                }

            }).catch((error) => {
                alert("Algo deu errado.")
            })
    }
    
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log(this.state)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        Axios.put("/api/profile/set", {
            phone: this.state.phone,
            gender: this.state.gender,
            sports: this.state.sports,
            music: this.state.music,
            travel: this.state.travel,
        })
        window.location.reload()
    }

    render() {
        return (<div className="profile">
            {(!this.state.terms) ? 
            <div>
                {this.state.isLoggedIn ? 
                    <Redirect to="/terms" /> :
                    <Redirect to="/home" />
                }
            </div> : 
            <div> 
                <h1 id="name" />
                <div className="info">
                    <table>
                    <tbody>
                        <tr>
                            <td className="column1"><p><strong>E-mail: </strong></p></td>
                            <td className="column2" id="email"></td>
                        </tr>
                        <tr>
                            <td className="column1"><p><strong>Phone: </strong></p></td>
                            <td className="column2" id="phone"></td>
                        </tr>
                        <tr>
                            <td className="column1"><p><strong>Gender: </strong></p></td>
                            <td className="column2" id="gender"></td>
                        </tr>
                        <tr>
                            <td className="column1"><p><strong>Sports: </strong></p></td>
                            <td className="column2" id="sports"></td>
                        </tr>
                        <tr>
                            <td className="column1"><p><strong>Music: </strong></p></td>
                            <td className="column2" id="music"></td>
                        </tr>
                        <tr>
                            <td className="column1"><p><strong>Travel: </strong></p></td>
                            <td className="column2" id="travel"></td>
                        </tr>
                    </tbody>
                    </table>
                    <div className="button-container" id="button-container" />
                </div>
            </div>}
        </div>);
    }
}

export default Profile;


function BuildOnClick(handleChange, handleSubmit) {
    const button = document.getElementById("button")
    button.onclick = () => {
        const phone = document.getElementById("phone")
        const gender = document.getElementById("gender")
        const sports = document.getElementById("sports")
        const music = document.getElementById("music")
        const travel = document.getElementById("travel")
        
        const defaultPhone = phone.innerHTML       
        const defaultGender = gender.innerHTML
        const defaultSports = sports.innerHTML
        const defaultMusic = music.innerHTML
        const defaultTravel = travel.innerHTML

        let phoneInput = document.createElement("input")
        let genderSelect = document.createElement("select")
        let sportsInput = document.createElement("input")
        let musicInput = document.createElement("input")
        let travelInput = document.createElement("input")

        phoneInput.name = "phone"
        genderSelect.name = "gender"
        sportsInput.name = "sports"
        musicInput.name = "music"
        travelInput.name = "travel"

        phoneInput.defaultValue = defaultPhone
        genderSelect.defaultValue = defaultGender
        sportsInput.defaultValue = defaultSports
        musicInput.defaultValue = defaultMusic
        travelInput.defaultValue = defaultTravel
    
        phoneInput.onchange = handleChange
        genderSelect.onchange = handleChange
        sportsInput.onchange = handleChange
        musicInput.onchange = handleChange
        travelInput.onchange = handleChange

        phone.innerHTML = ""
        gender.innerHTML = ""
        sports.innerHTML = ""
        music.innerHTML = ""
        travel.innerHTML = ""

        let D = document.createElement("option")
        D.value = "default"
        D.innerHTML = "Selecione"
        D.disabled = true
        let M = document.createElement("option")
        M.value = "Masculino"
        M.innerHTML = "Masculino"
        let F = document.createElement("option")
        F.value = "Feminino"
        F.innerHTML = "Feminino"
        let O = document.createElement("option")
        O.value = "Outro"
        O.innerHTML = "Outro"
        let N = document.createElement("option")
        N.value = "Não informado"
        N.innerHTML = "Não desejo informar"

        genderSelect.appendChild(D)
        genderSelect.appendChild(M)
        genderSelect.appendChild(F)
        genderSelect.appendChild(O)
        genderSelect.appendChild(N)
        
        switch (defaultGender) {
            case "Masculino":
                M.selected = true
                break;
            case "Feminino":
                F.selected = true
                break;
            case "Outro":
                O.selected = true
                break;
            case "Não informado":
                N.selected = true
                break;
            default:
                D.selected = true
                break;
        }

        phone.appendChild(phoneInput)
        gender.appendChild(genderSelect)
        sports.appendChild(sportsInput)
        music.appendChild(musicInput)
        travel.appendChild(travelInput)

        button.innerHTML = "Salvar"
        button.onclick = handleSubmit
    }
}