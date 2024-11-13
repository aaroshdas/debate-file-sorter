import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './App.css';
import './Scroll.css'
import './DocHolder.css'
import './Login.css'


//top bit
//images

import { Redis } from "https://esm.sh/@upstash/redis";

const redis = new Redis({
  url: process.env.REACT_APP_UPSTASH_URL,
  token: process.env.REACT_APP_UPSTASH_TOKEN
});
async function createTeam(setTeamCreatorOpen){
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
    if(teamExists === false && document.getElementById("new-team-name").value.length >0 && document.getElementById("new-team-id").value.length >0){
        data.push({id:id, name:document.getElementById("new-team-name").value})
        document.getElementById("new-team-name").value ="";
        document.getElementById("new-team-id").value="";
        setTeamCreatorOpen(false)
        document.getElementById("create-team-button").classList.add("field-filled")

        if(document.getElementById("new-team-name").classList.contains("field-unfilled")){
            document.getElementById("new-team-name").classList.remove("field-unfilled")
        }
        if(document.getElementById("new-team-id").classList.contains("field-unfilled")){
            document.getElementById("new-team-id").classList.remove("field-unfilled")
        }
    }
    else{
        if(document.getElementById("create-team-button").classList.contains("field-filled")){
            document.getElementById("create-team-button").classList.remove("field-filled")
        }
        

        if(document.getElementById("new-team-name").value.length ===0){
            document.getElementById("new-team-name").classList.add("field-unfilled")
        }
        else{
            if(document.getElementById("new-team-name").classList.contains("field-unfilled")){
                document.getElementById("new-team-name").classList.remove("field-unfilled")
            }
        }
        if(teamExists === true || document.getElementById("new-team-id").value.length ===0){
            document.getElementById("new-team-id").classList.add("field-unfilled")
        }
        else{
            if(document.getElementById("new-team-id").classList.contains("field-unfilled")){
                document.getElementById("new-team-id").classList.remove("field-unfilled")
            }
        }
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
        if(data[i].id === document.getElementById("login-input-id").value){
            teamExists = true;
            index = i;
            break;
        }
    }
    if(teamExists && document.getElementById("login-input-username").value === data[index].name){
        setValidLogin(true);
        if(document.getElementById("login-input-id").classList.contains("field-unfilled")){
            document.getElementById("login-input-id").classList.remove("field-unfilled")
        }
        if(document.getElementById("login-input-username").classList.contains("field-unfilled")){
            document.getElementById("login-input-username").classList.remove("field-unfilled")
        }
        setStateData({id:document.getElementById("login-input-id").value, teamName:data[index].name})
    }
    else if(document.getElementById("login-input-username").value !== data[index].name){
        document.getElementById("login-input-username").classList.add("field-unfilled")
        setValidLogin(false);
    }
    else{
        document.getElementById("login-input-id").classList.add("field-unfilled")
        setValidLogin(false);
    }
}


function Login(){
    const[stateData, setStateData] = useState({id:-1, teamName:"test"})
    const[validLogin, setValidLogin] = useState(false)
    const[teamCreatorOpen, setTeamCreatorOpen] = useState(false);

    // const observer = new IntersectionObserver((entries) =>{
    //     entries.forEach((entry)=>{
    //       if(entry.isIntersecting){
    //         entry.target.classList.remove("hide");
    //       }
    //       else{
    //         entry.target.classList.add("hide");
    //       }
    //     })
    //   }, { threshold:0.2})
    // const items = document.querySelectorAll('.CLASSNAME')
    // items.forEach((el) => observer.observe(el))

    return(
        <div className="login-screen-container">
            <div className={`login-register-container ${teamCreatorOpen ? "hide-container-width" : ""}`}>
                <div className="team-creation-inner-cont">
                    <div className="login-container">
                    <main className="team-header">login</main>
                        <main>username</main>
                        <input className='input-field login-input' onChange={()=>{
                            setValidLogin(false)
                            if(document.getElementById("login-input-username").classList.contains("field-filled")){
                                document.getElementById("login-input-username").classList.remove("field-filled")
                            }
                        }} id ="login-input-username" type="text" placeholder='username...'/>
                    </div>
                    <div className="login-container">
                        <main>id</main>
                        <input className='input-field login-input' onChange={()=>{
                                setValidLogin(false)
                                if(document.getElementById("login-input-id").classList.contains("field-filled")){
                                    document.getElementById("login-input-id").classList.remove("field-filled")
                                }
                            }} id ="login-input-id" type="text" placeholder='id...'/>
                    </div>
                    <div className="login-container">
                            <button className="open-team-creator-button" onClick={()=>{
                                setTeamCreatorOpen(!teamCreatorOpen)
                            }}>don't have a folder? create one</button>
                    </div>
                    <div className="login-container">
                        <button className ={`submit-id ${validLogin ? "hide-element": ""}`} onClick={()=>{
                            checkTeam(setValidLogin, setStateData);
                        }}><span>Login</span></button>
                                        
                        <Link to="/home" state={stateData}>
                            <button className={`field-filled to-home-link submit-id ${!validLogin ? "hide-element": ""}`}><span>Join</span></button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`team-creation-container ${teamCreatorOpen ? "" :"hide-container-width"}`}>
                <div className="team-creation-inner-cont">
                    <div className="login-container">
                    <main className="team-header">create new folder</main>
                    </div>
                    <div className="login-container">
                        <main>username</main>
                        <input className='input-field login-input team-creation-input' id ="new-team-name" type="text" placeholder='username...'/>
                    </div>
                    <div className="login-container">
                        <main>id</main>
                        <input className='input-field login-input team-creation-input' id ="new-team-id" type="text" placeholder='id...'/>
                    </div>
                    <div className="login-container">
                        <button className="open-team-creator-button" onClick={()=>{
                            setTeamCreatorOpen(!teamCreatorOpen)
                        }}>back to login</button>
                    </div>
                    <div className="login-container">
                        <button id= "create-team-button" className='submit-id team-creation-button' onClick={()=>{
                        createTeam(setTeamCreatorOpen);
                        }}><span>Create Folder</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;