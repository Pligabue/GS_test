import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import Axios from 'axios';
import "./Profile.css"


function BuildOnClick(handleChange, handleSubmit) {
    const button = document.getElementById("button")
    button.onclick = () => {
        const phone = document.getElementById("phone")
        const sports = document.getElementById("sports")
        const music = document.getElementById("music")
        const travel = document.getElementById("travel")

        const defaultPhone = phone.innerHTML
        const defaultSports = sports.innerHTML
        const defaultMusic = music.innerHTML
        const defaultTravel = travel.innerHTML

        let phoneInput = document.createElement("input")
        let sportsInput = document.createElement("input")
        let musicInput = document.createElement("input")
        let travelInput = document.createElement("input")

        phoneInput.name = "phone"
        sportsInput.name = "sports"
        musicInput.name = "music"
        travelInput.name = "travel"

        phoneInput.defaultValue = defaultPhone
        sportsInput.defaultValue = defaultSports
        musicInput.defaultValue = defaultMusic
        travelInput.defaultValue = defaultTravel

        phoneInput.onchange = handleChange
        sportsInput.onchange = handleChange
        musicInput.onchange = handleChange
        travelInput.onchange = handleChange

        phone.innerHTML = ""
        sports.innerHTML = ""
        music.innerHTML = ""
        travel.innerHTML = ""

        phone.appendChild(phoneInput)
        sports.appendChild(sportsInput)
        music.appendChild(musicInput)
        travel.appendChild(travelInput)

        button.innerHTML = "Salvar"
        button.onclick = handleSubmit
    }

    
}

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            profileId: this.props.match.params.id,
            isLoggedIn: this.props.isLoggedIn,
            id: this.props.id,
            TandC: this.props.TandC
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                profileId: this.props.match.params.id,
                isLoggedIn: this.props.isLoggedIn,
                id: this.props.id,
                TandC: this.props.TandC
            })
        }
    }

    componentDidMount() {
        if (this.state.TandC)
            Axios.get("/api/profile/"+this.state.profileId)
            .then(response => {
                let name = document.getElementById("name")
                name.innerHTML = response.data.name
                
                let email = document.getElementById("email")
                email.innerHTML += response.data.email

                let phone = document.getElementById("phone")
                phone.innerHTML += response.data.phone
                
                let gender = document.getElementById("gender")
                gender.innerHTML += response.data.gender

                let sports = document.getElementById("sports")
                if (response.data.sports == null)
                    sports.innerHTML += ""
                else    
                    sports.innerHTML += response.data.sports
                
                let music = document.getElementById("music")
                if (response.data.music == null)
                    music.innerHTML += ""
                else    
                    music.innerHTML += response.data.music

                let travel = document.getElementById("travel")
                if (response.data.travel == null)
                    travel.innerHTML += ""
                else    
                    travel.innerHTML += response.data.travel

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
            sports: this.state.sports,
            music: this.state.music,
            travel: this.state.travel,
        })
        window.location.reload()
    }

    render() {
        return (<div>
            {(!this.state.TandC) ? 
            <div>
                {this.state.isLoggedIn ? 
                    <Redirect to="/terms" /> :
                    <Redirect to="/home" />
                }
            </div> : 
            <div className="profile"> 
                <h1 id="name" />
                <div className="info">
                    <div className="divTable">
                        <div className="divTableRow">
                            <div className="divTableCell"><p><strong>E-mail: </strong></p></div>
                            <div className="divTableCell" id="email" />
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell"><p><strong>Phone: </strong></p></div>
                            <div className="divTableCell" id="phone" />
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell"><p><strong>Gender: </strong></p></div>
                            <div className="divTableCell" id="gender" />
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell"><p><strong>Sports: </strong></p></div>
                            <div className="divTableCell" id="sports" />
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell"><p><strong>Music: </strong></p></div>
                            <div className="divTableCell" id="music" />
                        </div>
                        <div className="divTableRow">
                            <div className="divTableCell"><p><strong>Travel: </strong></p></div>
                            <div className="divTableCell" id="travel" />
                        </div>
                    </div>
                    <div className="button-container" id="button-container" />
                </div>
            </div>}
        </div>);
    }
}

export default Profile;
