import React, { Component } from 'react';
import Axios from 'axios';
import {clearUserId} from "./UserData"

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }
    
    componentDidMount() {
        Axios.get("/api/terms")
            .then(response => {
                if (!response.data.TandC)
                    window.location.assign("/terms")
                else {
                    Axios.get("/api/profile/"+this.state.id)
                    .then(response => {
                        console.log(response.data)
                    })
                }
            }).catch(() => {
                Axios.get("/api/logout")
                clearUserId()
            })
    }
    
    render() {
        return (<div>

        </div>);
    }
}

export default Profile;
