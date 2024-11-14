import React, { useState, useEffect } from "react";
import './Dropdown.css'


import { Redis } from "https://esm.sh/@upstash/redis";
const redis = new Redis({
  url: process.env.REACT_APP_UPSTASH_URL,
  token: process.env.REACT_APP_UPSTASH_TOKEN
});
async function getDocs(setAllDocs, id){
    let allDocs = await redis.get(`docs${id}`)
    if(allDocs == null){
        allDocs=[]
    }
    setAllDocs(allDocs)
}
async function createDoc(setAllDocs, selectedSide, selectedType, selectedTopic,id){
    if(document.getElementById("file-name").value.length > 0 && document.getElementById("file-link").value.length > 0){
        const name = document.getElementById("file-name").value;
        const link = document.getElementById("file-link").value;
        const info = document.getElementById("file-info").value;
        const minTime = document.getElementById("min-time").value;
        const maxTime = document.getElementById("max-time").value;
        let allDocs = await redis.get(`docs${id}`)
        if(allDocs == null){
            allDocs=[];
        }
        allDocs.push({
            docName:name,
            docLink:link,
            docInfo:info,
            minTime: minTime,
            maxTime: maxTime,
            type:selectedType,
            side:selectedSide,
            topic:selectedTopic,
            status:"None",
            intRep: Math.random()
        })
        await redis.set(`docs${id}`, allDocs);
        document.getElementById("file-name").value ="";
        document.getElementById("file-link").value= "";
        document.getElementById("file-info").value= "";
        document.getElementById("min-time").value= "";
        document.getElementById("max-time").value= "";
      
        setAllDocs(allDocs)
    }
}
async function updateRedis(topicDropdownOptions, id){
    await redis.set(`topics${id}`, topicDropdownOptions);
}

function onUserType(){
    const allFields = document.getElementsByClassName("input-field");
    for(let k=0; k< allFields.length; k++){
        if(allFields[k].value.toString().length > 0){  
            allFields[k].classList.add("field-filled");
        }
    }
    document.getElementById("file-name").value.length > 0 && document.getElementById("file-link").value.length > 0 ? document.getElementById('submit-button').classList.add("field-filled"): updateSubmitButton();
}
function updateSubmitButton(){
    document.getElementById('submit-button').classList.add("field-unfilled"); if(document.getElementById('submit-button').classList.contains("field-filled")){document.getElementById('submit-button').classList.remove("field-filled")}
}
async function getTopicData(setTopicDropdownOption,id){
    let data = await redis.get(`topics${id}`);
    if(data !== null && data.length >0){
        setTopicDropdownOption(data);
    }
    else{
        setTopicDropdownOption([
            {
                label:"None",
                value:"None",
                intRep:0,
            }])
    }
}

function DocCreator({setAllDocs, setTopicDropdownOption, topicDropdownOption, id}){
    const[sideDropdownActive, setSideDropdownActive] = useState(false);
    const[typeDropdownActive, setTypeDropdownActive] = useState(false);
    const[topicDropdownActive, setTopicDropdownActive] = useState(false);
    

    const[selectedSide, setSelectedSide] = useState("(side)");
    const[selectedType, setSelectedType] = useState("(type)");
    const[selectedTopic, setSelectedTopic] = useState("(topic)");

    let sideDropdownOption=[{
        label:"Negative",
        value:"Neg",
        intRep:0
    },{
        label:"Affirmative",
        value:"Aff",
        intRep:1
    },
    {
        label:"None",
        value:"None",
        intRep:2
    }
    ]
    let typeDropdownOption=[{
        label:"Case",
        value:"Case",
        intRep:0
    },{
        label:"Block/A2",
        value:"Block/A2",
        intRep:1
    },
    {
        label:"Opponent Case",
        value:"O. Case",
        intRep:2
    },
    {
        label:"None",
        value:"None",
        intRep:3
    }];
    useEffect(()=>{
        getTopicData(setTopicDropdownOption, id);
        getDocs(setAllDocs, id)
    }, [setAllDocs, setTopicDropdownOption, id]);
    
    return(
        <div>
             <div className="side-dropdown-container">
                <button id ="side-toggle-3" className="side-dropdown-toggle" onClick={()=>{
                    setTopicDropdownActive(!topicDropdownActive); 
                    topicDropdownActive ? document.getElementById("side-drop-button-3").innerHTML = "+": document.getElementById("side-drop-button-3").innerHTML = "-";
                    document.getElementById("side-toggle-3").classList.add("border");
                    setTimeout(()=>{
                        document.getElementById("side-toggle-3").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedTopic}</main>        
                    <main id = "side-drop-button-3" className="dropdown-button">+</main>    
                </button>
                <div className={`side-dropdown-options-overflow side-dropdown-options ${topicDropdownActive ? "dropdown-visible":""}`}>
                   {topicDropdownOption.map((option, index)=>{
                    return <div className="option-container" key={index}><button className="dropdown-option" onClick={()=>{
                        setSelectedTopic(option.value);
                        setTopicDropdownActive(false);
                        document.getElementById("side-toggle-3").classList.add("field-filled");
                        if(document.getElementById("side-toggle-3").classList.contains("border")){
                            document.getElementById("side-toggle-3").classList.remove("border");                     
                        }

                    }}>{option.value}</button>
                    <button id = {`delete-topic${option.intRep}`} className="create-new-topic-button" onClick={()=>{
                        
                        document.getElementById(`delete-topic${option.intRep}`).classList.add("border");
                        setTimeout(()=>{
                            if(document.getElementById(`delete-topic${option.intRep}`)!= null && document.getElementById(`delete-topic${option.intRep}`).classList.contains("border")){
                                document.getElementById(`delete-topic${option.intRep}`).classList.remove("border");
                            }
                        }, 500);
                        let newTopicDropdown = topicDropdownOption;
                        let k =0;
                        for(let i = 0; i<newTopicDropdown.length; i++){
                            if(newTopicDropdown[i].intRep === option.intRep){
                                k=i;
                                break;
                            }
                        }
                        newTopicDropdown.splice(k, 1);
                        setTopicDropdownOption(newTopicDropdown);
                        setTopicDropdownActive(false);
                        if(document.getElementById("side-toggle-3").classList.contains("border")){
                            document.getElementById("side-toggle-3").classList.remove("border");                     
                        }
                        setTimeout(()=>{setTopicDropdownActive(true);}, 0);
                        updateRedis(topicDropdownOption, id);
                    }}>-</button>
                    </div>
                   })}
                   <div className="new-topic-container">
                    <input id="create-new-topic" className="create-new-topic" placeholder="create new topic..." type="text">
                    </input>
                
                    <button id = "create-new-topic-button" className="create-new-topic-button" onClick={()=>{
                        document.getElementById("create-new-topic-button").classList.add("border");
                        setTimeout(()=>{
                            document.getElementById("create-new-topic-button").classList.remove("border");
                        }, 500);
                        let newTopicDropdown = topicDropdownOption;
                        newTopicDropdown.push({
                            label:document.getElementById("create-new-topic").value,
                            value:document.getElementById("create-new-topic").value.toString().split(" ")[0],
                            intRep:Math.random()
                        });
                        setTopicDropdownOption(newTopicDropdown);
                        document.getElementById("create-new-topic").value =""
                        setTopicDropdownActive(false);
                       
                        if(document.getElementById("side-toggle-3").classList.contains("border")){
                            document.getElementById("side-toggle-3").classList.remove("border");                     
                        }
                        setTimeout(()=>{setTopicDropdownActive(true);}, 0);
                        updateRedis(topicDropdownOption, id);

                    }}>+</button>
                   </div>
                </div>
            </div>

            <div className="side-dropdown-container">
                <button id ="side-toggle" className="side-dropdown-toggle" onClick={()=>{
                    setSideDropdownActive(!sideDropdownActive); 
                    sideDropdownActive ? document.getElementById("side-drop-button").innerHTML = "+": document.getElementById("side-drop-button").innerHTML = "-";
                    document.getElementById("side-toggle").classList.add("border");
                
                    setTimeout(()=>{
                        document.getElementById("side-toggle").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedSide}</main>        
                    <main id = "side-drop-button" className="dropdown-button">+</main>    
                </button>
                <div className={`side-dropdown-options ${sideDropdownActive ? "dropdown-visible":""}`}>
                   {sideDropdownOption.map((option, index)=>{
                    return <button className="dropdown-option" key={index} onClick={()=>{
                        setSelectedSide(option.value);
                        setSideDropdownActive(false);
                        document.getElementById("side-toggle").classList.add("field-filled");
                        if(document.getElementById("side-toggle").classList.contains("border")){
                            document.getElementById("side-toggle").classList.remove("border");
                        }
                    }}>{option.value}</button>
                   })}
                </div>
            </div>


            <div className="side-dropdown-container">
                <button id ="side-toggle-2" className="side-dropdown-toggle" onClick={()=>{
                    setTypeDropdownActive(!typeDropdownActive); 
                    sideDropdownActive ? document.getElementById("side-drop-button-2").innerHTML = "+": document.getElementById("side-drop-button-2").innerHTML = "-";
                    document.getElementById("side-toggle-2").classList.add("border");

                    setTimeout(()=>{
                        document.getElementById("side-toggle-2").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedType}</main>        
                    <main id = "side-drop-button-2" className="dropdown-button">+</main>    
                </button>
                <div className={`side-dropdown-options ${typeDropdownActive ? "dropdown-visible":""}`}>
                   {typeDropdownOption.map((option, index)=>{
                    return <button className="dropdown-option" key={index} onClick={()=>{
                        setSelectedType(option.value);
                        setTypeDropdownActive(false);
                        document.getElementById("side-toggle-2").classList.add("field-filled");
                        if(document.getElementById("side-toggle-2").classList.contains("border")){
                            document.getElementById("side-toggle-2").classList.remove("border");
                        }
                    }}>{option.label}</button>
                   })}
                </div>
            </div>

            <div className={`hide-input-fields ${selectedSide !== "(side)" && selectedTopic !=="(topic)" && selectedType !== "(type)" ? "show-input-fields":""}`}>
            <div className="input-field-container">
                <div>
                    <main className="input-header top-input-field">doc info</main>
                    <input id="file-name" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="text" placeholder="name..."/>
                </div>
                <div>
                    <input id="file-info" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="text" placeholder="info (opt.)..."/>
                </div>
                <div>
                    <input id="file-link" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="text" placeholder="link..."/>
                </div>
                <div className="input-container">
                    <main className="input-header">time to read (min.sec) (optional)</main>
                    <input id="min-time" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="number" placeholder="min time..."/>
                </div>
                <div>
                    <input id="max-time" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="number" placeholder="max time..."/>
                </div>
            </div>
            <div className="side-dropdown-container">
                 <button id = "submit-button" className={`submit-button field-unfilled`} onClick={()=>{
                     createDoc(setAllDocs, selectedSide, selectedType, selectedTopic, id);
                     document.getElementById("submit-button").classList.add("border");
                     setTimeout(()=>{
                         document.getElementById("submit-button").classList.remove("border");
                     },500);
                 }}><span>submit</span></button>
            </div>
            </div>
        </div>
    )
}
export default DocCreator;
