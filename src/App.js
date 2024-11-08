/*
1. style id + top into 2 boxes
2. search bar to search items by name
3. ordering items? might be a strech
*/

import React from 'react';
import { useState } from 'react';

import DocCreator from './DocCreator/DocCreator';
import DocSorter from './DocSorter/DocSorter';

import './App.css';
import './Scroll.css'
import './DocHolder.css'

import { Redis } from "https://esm.sh/@upstash/redis";

const redis = new Redis({
  url: process.env.REACT_APP_UPSTASH_URL,
  token: process.env.REACT_APP_UPSTASH_TOKEN
});

function App() {
  const [leftSideToggled, setLeftSideToggled] = useState(true)
  const [showDocs, setShowDocs] = useState(true)
  const [allDocs, setAllDocs] = useState([]) 

  const [selectedTopic, setSelectedTopic] = useState("None") 
  const [selectedSide, setSelectedSide] = useState("None") 
  const [selectedType, setSelectedType] = useState("None") 

  const [userID, setUserID] = useState(Math.round(Math.random()*1000000))
  const[topicDropdownOption, setTopicDropdownOption] = useState([
    {
        label:"None",
        value:"None",
        intRep:0,
    }]
);

  return (
    <div>
      <div className='body-container'>
        <div>
          <button id = "expand-left" className={`expand-left ${leftSideToggled ? "":"shrink-left"}`} onClick={()=>{setLeftSideToggled(!leftSideToggled)}}>&#62;</button>
        </div>
        <div id = "left-container" className={`left-container ${leftSideToggled ? "":"small-width"}`}>
          <div className = "left-inside-container">
          <main>Add New Document</main>
          <DocCreator id = {userID} setAllDocs={setAllDocs} setTopicDropdownOption={setTopicDropdownOption} topicDropdownOption={topicDropdownOption}/>
          <div className='left-login-container'>
            <main className='right-header'>Current ID: {userID}</main>
            <input className='input-field field-unfilled' id ="user-id-input" type="number" placeholder='join/create team (enter id)...'/>
            <button id='submit-id' onClick={()=>{
              setUserID(document.getElementById("user-id-input").value);
              document.getElementById("user-id-input").classList.add("field-filled");
              document.getElementById("user-id-input").value="";
            }}><span>submit</span></button>
          </div>
          </div>
        </div>
        <div className="right-container">
          <main className='right-header'>Documents</main>
          <DocSorter topicDropdownOption={topicDropdownOption} setSelectedSide={setSelectedSide} selectedSide={selectedSide} setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic} setSelectedType={setSelectedType} selectedType={selectedType}/>
          <div className='toggle-docs-container'>
          <button id="toggle-docs-button" className = "submit-button toggle-docs-button field-unfilled" onClick={()=>{
            setShowDocs(!showDocs)
            if(showDocs){
              document.getElementById("toggle-docs").innerHTML= "+ docs"
               document.getElementById("toggle-docs-button").classList.remove("field-unfilled");
               document.getElementById("toggle-docs-button").classList.add("field-filled");
            }
            else{
              document.getElementById("toggle-docs").innerHTML= "- docs"
              document.getElementById("toggle-docs-button").classList.add("field-unfilled");
              document.getElementById("toggle-docs-button").classList.remove("field-filled");
            }
          }}><span id= "toggle-docs">- docs</span></button>
          </div>
          <div className={`docs-container ${showDocs ? "docs-visible": ""} `}>
            {allDocs.length>0 ? allDocs.map((docData, index)=>{
              return <div className ={`doc-container ${(selectedTopic !== "None" && selectedTopic !== docData.topic) || (selectedSide !== "None" && selectedSide !==docData.side) ||(selectedType !=="None" && selectedType!==docData.type) ? "hide-container": ""}`} key={index}>
                <div onClick={()=>{ window.open(docData.docLink);}} className='doc-info'>
                  <main className='d-topic'>{docData.topic} </main>
  
                  <main className='d-name'> {docData.docName}</main>
       
                  <main className='d-type'>{docData.type}</main>
                  <main className='d-side'>{docData.side}</main>
        
                
                  <main className='d-info'>{docData.docInfo}</main> 
                  {docData.minTime >0 ? <main className='d-time'>{docData.minTime} - {docData.maxTime} min</main>:<main>-</main>}
                 
                  <main>-</main>
                  <a href={`${docData.docLink}`} target='_blank' rel="noreferrer"><button className='submit-button doc-link'><span>Doc Link</span></button></a>
                  
                </div>
                <button id ='delete-button' className='delete-button' onClick={()=>{
                  let i =0;
                  console.log(allDocs)
                  for(let k = 0; k<allDocs.length; k++){
                    if(allDocs[k].intRep === docData.intRep){
                      i= k;
                      break;
                    }
                  }

                  allDocs.splice(i, 1);
                  setAllDocs(allDocs);
                  setShowDocs(false)
                  setTimeout(()=>{
                    setShowDocs(true);
                  },0)
                  redis.set(`docs${userID}`, allDocs);
                  
                }}>x</button>
              </div>
            }) : console.log("")}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
