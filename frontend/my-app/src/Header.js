/*global FB*/

import React from 'react';
import { Link } from "react-router-dom"
import Axios from 'axios';

import "./Header.css"

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.LogOut = this.LogOut.bind(this)
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            id: this.props.id,
            terms: this.props.terms
        }
    }
    
    componentDidMount() {
        // FB SDK
        window.fbAsyncInit = function() {
            FB.init({
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
    

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
                id: this.props.id,
                terms: this.props.terms
            })
        }
    }
    
    LogOut() {
        FB.getLoginStatus(response => {
            if (response.status === "connected")
                window.FB.logout()
        })
        Axios.get("/api/logout")
        .then(() => {
            setTimeout(() => {
                window.location.assign("/")
            }, 500);
        })
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
                        <button onClick={this.LogOut}>Log Out</button>
                    </div> 
                </div>}
            </div> 
        </div>)
    }
}

export default Header;



            