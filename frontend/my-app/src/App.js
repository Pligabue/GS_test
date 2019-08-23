import React from 'react';
import {Switch, Route} from "react-router-dom"
import './App.css';

import SignUp from './SignUp';
import Login from './Login';
import Check from './Check';

class App extends React.Component {
    render() {
        return (<div className="App">
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/check" component={Check} />
            </Switch>
        </div>)
    }
}

export default App;
