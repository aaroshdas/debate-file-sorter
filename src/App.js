import React from 'react';
import { useState } from 'react';

import DocCreator from './DocCreator/DocCreator';

import './App.css';
import './Scroll.css'

// import { Redis } from "https://esm.sh/@upstash/redis";
// const redis = new Redis({
//   url: process.env.REACT_APP_UPSTASH_URL,
//   token: process.env.REACT_APP_UPSTASH_TOKEN
// });


function App() {
  const [leftSideToggled, setLeftSideToggled] = useState(true)
  return (
    <div>
      <div className='body-container'>
        <div>
          <button id = "expand-left" className={`expand-left ${leftSideToggled ? "":"shrink-left"}`} onClick={()=>{setLeftSideToggled(!leftSideToggled)}}>&#62;</button>
        </div>
        <div id = "left-container" className={`left-container ${leftSideToggled ? "":"small-width"}`}>
          <div className = "left-inside-container">
          <main>Add New Document</main>
          <DocCreator/>
          </div>
        </div>
        <div className="right-container">
          <main>Documents</main>
        </div>
      </div>
    </div>
  );
}

export default App;
