import React from 'react';

import axios from "axios"

function Check() {
    let info = ""
    axios.get("/api/check")
    .then(Response => {
        info = "logado"
        document.getElementById("header").innerHTML = info
    }).catch(error => {
        info = "não"
        document.getElementById("header").innerHTML = info
    })
    return(<div><p id="header" /></div>)
} export default Check