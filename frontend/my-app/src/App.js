import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom"
import Axios from 'axios';
import './App.css';

import SignUp from './SignUp';
import Login from './Login';
import Check from './Check';
import Header from './Header';
import TandC from './TandC';
import Profile from './Profile';
import NoMatch from "./NoMatch";
import Home from "./Home";

import {setUserId, getUserId, clearUserId} from "./UserData"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            isLoggedIn: false,
            TandC: false,
        }
    }
    
    componentDidMount() {
        Axios.get("/api/get/session")
        .then(response => {
            this.setState({
                id: response.data.id,
                isLoggedIn: true,
                TandC: response.data.TandC
            })
        })
    }
    

    render() {
        return (<div className="App">
            <Header {...this.state} />
            <Switch>
                <Route path="/home" component={Home} />
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/check" component={Check} />
                <Route path="/terms" component={TandC} />
                {this.state.isLoggedIn &&
                    <Route path="/profile/:id" render={(props) => (
                        <Profile key={props.match.params.id} {...props} {...this.state} />
                    )} />
                }
                <Route component={NoMatch} />
            </Switch>
        </div>)
    }
}

export default App;
