import React from 'react';
import {Switch, Route} from "react-router-dom"
import './App.css';

import SignUp from './SignUp';
import Login from './Login';
import Check from './Check';
import Header from './Header';
import TandC from './TandC';
import Profile from './Profile';

import {setUserId, getUserId, clearUserId} from "./UserData"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: getUserId(),
            isLoggedIn: (getUserId() != null)
        }
        
    }
    

    render() {
        return (<div className="App">
            <Header {...this.state} />
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/check" component={Check} />
                <Route path="/terms" component={TandC} />
                <Route path="/profile/:id" render={(props) => (
                    <Profile key={props.match.params.id} {...props} />
                )} />
            </Switch>
        </div>)
    }
}

export default App;
