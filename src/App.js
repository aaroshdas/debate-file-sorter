import React from 'react';
import { useState } from 'react';

import DocCreator from './DocCreator/DocCreator';

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
  return (
    <div>
      <div className='body-container'>
        <div>
          <button id = "expand-left" className={`expand-left ${leftSideToggled ? "":"shrink-left"}`} onClick={()=>{setLeftSideToggled(!leftSideToggled)}}>&#62;</button>
        </div>
        <div id = "left-container" className={`left-container ${leftSideToggled ? "":"small-width"}`}>
          <div className = "left-inside-container">
          <main>Add New Document</main>
          <DocCreator setAllDocs={setAllDocs}/>
          </div>
        </div>
        <div className="right-container">
          <main>Documents</main>
          <div className={`docs-container ${showDocs ? "docs-visible": ""} `}>
            {allDocs.length>0 ? allDocs.map((docData, index)=>{
              return <div className ="doc-container" key={index}>
                <div className='doc-info'>
                  <main className='d-topic'>{docData.topic} </main>
  
                  <main className='d-name'> {docData.docName}</main>
       
                  <main className='d-type'>{docData.type}</main>
                  <main className='d-side'>{docData.side}</main>
        
                
                  <main className='d-info'>{docData.docInfo}</main>
                  <main className='d-time'>{docData.minTime} - {docData.maxTime}</main>
                  <main>-</main>
                  <a href={`${docData.docLink}`} target='_blank' rel="noreferrer"><button className='submit-button doc-link'><span>Doc Link</span></button></a>
                  
                </div>
                <button id ='delete-button' className='delete-button' onClick={()=>{
                  let i =0;
                  console.log(allDocs)
                  for(let k = 0; k<allDocs.length; k++){
                    console.log(allDocs[k].intRep)
                    if(allDocs[k].intRep === docData.intRep){
                      i= k;
                      break;
                    }
                  }

                  console.log(i)
                  allDocs.splice(i, 1);
                  console.log(allDocs)
                  setAllDocs(allDocs);
                  setShowDocs(false)
                  setTimeout(()=>{
                    setShowDocs(true);
                  },500)
                  redis.set('docs', allDocs);
                  
                }}>-</button>
              </div>
            }) : console.log("")}
          </div>
          <button id= "toggle-docs" className = "submit-button toggle-docs-button" onClick={()=>{
            setShowDocs(!showDocs)
            if(showDocs){
              document.getElementById("toggle-docs").innerHTML= "+ docs"
            }
            else{
              document.getElementById("toggle-docs").innerHTML= "- docs"
            }
          }}><span>- docs</span></button>
        </div>
      </div>
    </div>
  );
}

export default App;
