import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './App.css';
import './Scroll.css'
import './DocHolder.css'
import './Login.css'


function Login(){
    const[stateData, setStateData] = useState({id:-1})
    return(
        <div>
            <input className='input-field login-input' onChange={()=>{
                 setStateData({id:document.getElementById("login-input").value})
            }} id ="login-input" type="number" placeholder='join/create team (enter id)...'/>
            <Link to="/home" state={stateData}>

            <button id='submit-id'><span>Login</span></button>
            </Link>
        </div>
    )
}
export default Login;