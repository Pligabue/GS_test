import React from 'react';
import "./Home.css"

class Home extends React.Component {

    render(){
        return(<div className="myForms">
            <h1 className="title">Bem-Vindo!</h1>
            <h2 style={{
                fontWeight: "normal",
            }}>
                Este é um site teste.
            </h2> 
        </div>)
    }
} export default Home