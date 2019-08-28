import React, { Component } from 'react';

export class About extends Component {
    render() {
        return (<div className="myForms">
            <h1 className="title">Sobre</h1>  
            <h2 style={{
                fontWeight: "normal",
                textAlign: "justify",
                textJustify: "inter-word"
            }}>
                Este é um site teste, no qual serão exercitadas as
                funções de incrição, login e CRUD de perfil. Além
                disso, também é possível fazer login utilizando o
                Facebook, através do Facebook SDK.
            </h2>     
        </div>);
    }
}

export default About;
