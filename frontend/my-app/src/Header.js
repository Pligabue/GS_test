import React from 'react';
import { Link } from "react-router-dom"
import Axios from 'axios';

import "./Header.css"
import { clearUserId } from "./UserData";

function LogOut() {
    Axios.get("/api/logout")
    clearUserId()
    setTimeout(() => {
        window.location.assign("/")
    }, 500);
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            id: this.props.id,
            TandC: this.props.TandC
        }
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

    render() {
        return (<div className="header">
            <div className="navigation">
                <Link to="/home">Home</Link>
            </div>
            <div className="navigationLogin">
                {!this.state.isLoggedIn ? <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </div>
                : <div>
                    <Link to={"/profile/"+this.state.id}>Profile</Link>
                    <div className="link-button" >
                        <button onClick={LogOut}>Log Out</button>
                    </div> 
                </div>}
            </div> 
        </div>)
    }
}

export default Header;



            