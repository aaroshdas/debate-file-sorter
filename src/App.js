/*

- search bar to search items by name
- mark as not finished
- editing boxes
- ordering items? might be a strech
- style id + top into 2 boxes * MAYBE
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
  const itemStatusOptions = [{
    value:"None",
    label:"None",
    intRep: 0
  },
  {
    value:"Empty",
    label:"Emp.",
    intRep: 3
  },
  {
    value:"Incomplete",
    label:"Inc.",
    intRep: 2
  },
  {
    value:"Usable",
    label:"Usa.",
    intRep: 2
  },
  {
    value:"Complete",
    label:"Com.",
    intRep: 1
  },
]

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
                  <div className="right-side-dropdown-container">
              </div>

                  {docData.minTime >0 ? <main className='d-time'>{docData.minTime} - {docData.maxTime} min</main>:<main>-</main>}
                 
                  <main>-</main>
                  <a href={`${docData.docLink}`} target='_blank' rel="noreferrer"><button className='submit-button doc-link'><span>Doc Link</span></button></a>
                  
                </div>
                <div>
                <button id ={`side-toggle-${docData.intRep}`} className={`side-dropdown-toggle item-dropdown-toggle outline-${docData.status.slice(0,-1)}`} onClick={()=>{
                      document.getElementById(`itemStatusID${docData.intRep}`).classList.contains("dropdown-visible") ? document.getElementById(`side-drop-button-${docData.intRep}`).innerHTML = "+": document.getElementById(`side-drop-button-${docData.intRep}`).innerHTML = "-";
                      document.getElementById(`side-toggle-${docData.intRep}`).classList.add("border");
                      document.getElementById(`itemStatusID${docData.intRep}`).classList.contains("dropdown-visible") ? document.getElementById(`itemStatusID${docData.intRep}`).classList.remove("dropdown-visible") :document.getElementById(`itemStatusID${docData.intRep}`).classList.add("dropdown-visible")
                      setTimeout(()=>{
                          document.getElementById(`side-toggle-${docData.intRep}`).classList.remove("border");
                      }, 500);
                      }}>
                      <main>{docData.status}</main>        
                      <main id = {`side-drop-button-${docData.intRep}`} className="dropdown-button">+</main>    
                  </button>
                  <div id={`itemStatusID${docData.intRep}`} className={`side-dropdown-options-overflow side-dropdown-options`}>
                      {itemStatusOptions.map((option, index)=>{
                      return <div className="option-container" key={index}><button className="dropdown-option" onClick={()=>{
                          console.log(option.value)
                          let i =0;
                          for(let k = 0; k<allDocs.length; k++){
                            if(allDocs[k].intRep === docData.intRep){
                              i= k;
                              break;
                            }
                          }
                        
                          allDocs[i].status = option.label;
              
                          setAllDocs(allDocs);
                          setShowDocs(false)
                          setTimeout(()=>{
                            setShowDocs(true);
                          },0)
                          redis.set(`docs${userID}`, allDocs);
                          if(document.getElementById(`itemStatusID${docData.intRep}`).classList.contains("dropdown-visible")){document.getElementById(`itemStatusID${docData.intRep}`).classList.remove("dropdown-visible")}
                      }}>{option.value}</button>
                      </div>
                      })}
                  </div>
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
