
import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom"
import Axios from 'axios';
import './App.css';

import SignUp from './SignUp';
import Login from './Login';
import Check from './Check';
import Header from './Header';
import Terms from './Terms';
import Profile from './Profile';
import NoMatch from "./NoMatch";
import Home from "./Home";





class App extends React.Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        Axios.get("/api/get/session")
        .then(response => {
            this.setState({
                id: response.data.id,
                isLoggedIn: true,
                terms: response.data.terms
            })
        }).catch(() => {
            this.setState({
                id: null,
                isLoggedIn: false,
                terms: false,
            })
        })

    }
    

    render() {
        if (this.state === undefined) {
            return(<div />)
        } else
            return (<div className="App">
                <Header {...this.state} />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route path="/check" component={Check} />
                    <Route path="/terms" component={Terms} />
                    <Route path="/profile/:id" render={(props) => (
                        <Profile key={props.match.params.id} {...props} {...this.state} />
                    )} />
                    <Route component={NoMatch} />
                </Switch> 
            </div>)
    }
}

export default App;
