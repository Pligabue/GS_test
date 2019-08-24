import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import Axios from 'axios';
import "./Profile.css"

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profileId: this.props.match.params.id,
            isLoggedIn: this.props.isLoggedIn,
            id: this.props.id,
            TandC: this.props.TandC
        }
        console.log(this.state)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
                id: this.props.id,
                TandC: this.props.TandC
            })
        }
    }

    componentDidMount() {
        Axios.get("/api/profile/"+this.state.profileId)
        .then(response => {
            let name = document.getElementById("name")
            name.innerHTML = response.data.name
            
            let email = document.getElementById("email")
            email.innerHTML += response.data.email
        }).catch((error) => {
            
        })
    }
    
    render() {
        return (<div>
            {(!this.state.TandC) ? <div>
                {this.state.isLoggedIn ? 
                    <Redirect to="/terms" /> :
                    <Redirect to="/home" />
                }
            </div> : <div className="profile"> 
                <h1 id="name" />
                <div className="info">
                    <p id="email"><strong>E-mail: </strong></p>
                    <p id="phone"><strong>Phone: </strong></p>
                    <p id="phone"><strong>Phone: </strong></p>
                </div>
            </div>}
        </div>);
    }
}

export default Profile;
