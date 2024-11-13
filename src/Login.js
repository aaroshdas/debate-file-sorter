import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './App.css';
import './Scroll.css'
import './DocHolder.css'
import './Login.css'

import { Redis } from "https://esm.sh/@upstash/redis";

const redis = new Redis({
  url: process.env.REACT_APP_UPSTASH_URL,
  token: process.env.REACT_APP_UPSTASH_TOKEN
});
async function createTeam(){
    let id = document.getElementById("new-team-id").value;
    let data = await redis.get("teams")
    let teamExists = false;
    if(data === null){
        data = [];
    }
    for(let i =0; i < data.length; i++){
        if(data[i].id === id){
            teamExists = true;
            break;
        }
    }
    if(teamExists === false){
        data.push({id:id, name:document.getElementById("new-team-name").value})
    }
    redis.set("teams", data)
}
async function checkTeam(setValidLogin, setStateData){
    let data = await redis.get("teams")
    let teamExists = false;
    if(data === null){
        data = [];
    }
    let index = 0;
    for(let i =0; i < data.length; i++){
        if(data[i].id === document.getElementById("login-input").value){
            teamExists = true;
            index = i;
            break;
        }
    }
    if(teamExists){
        setValidLogin(true);
        document.getElementById("login-input").classList.add("field-filled")
        setStateData({id:document.getElementById("login-input").value, teamName:data[index].name})
    }
    else{
        setValidLogin(false);
    }
}
function Login(){
    const[stateData, setStateData] = useState({id:-1, teamName:"test"})
    const[validLogin, setValidLogin] = useState(false)
    return(
        <div>
            <div>
                <input className='field-unfilled input-field login-input' onChange={()=>{
                    setValidLogin(false)
                    if(document.getElementById("login-input").classList.contains("field-filled")){
                        document.getElementById("login-input").classList.remove("field-filled")
                    }
                }} id ="login-input" type="number" placeholder='join folder (enter id)...'/>
                
                <button className ={`submit-id ${validLogin ? "hide-element": ""}`} onClick={()=>{
                    checkTeam(setValidLogin, setStateData);
                }}><span>Login</span></button>
                
                <Link to="/home" state={stateData}>
                <button className={`field-filled submit-id ${!validLogin ? "hide-element": ""}`}><span>Enter</span></button>
                </Link>
            </div>
            <div>
            <main className="header">Create Team</main>
                <div>
                    <input className='field-filled input-field login-input' id ="new-team-id" type="number" placeholder='create team folder (unique id)...'/>
                </div>
                <div>
                    <input className='input-field login-input' id ="new-team-name" type="text" placeholder='create team folder (name)...'/>
                </div>
                <button id= "create-team-button" className='submit-id' onClick={()=>{
                   createTeam();
                }}><span>Create Team</span></button>
            </div>
        </div>
    )
}
export default Login;