import React, { useState } from "react";
import './Dropdown.css'
function onUserType(){
    // const allFields = document.getElementsByClassName("input-field");
    // for(let k=0; k< allFields.length; k++){
    //     if(allFields[k].value.toString().length > 0){  
    //         allFields[k].classList.add("field-filled");
    //     }
    // }
}
function DocCreator(){
    const[sideDropdownActive, setSideDropdownActive] = useState(false);
    const[typeDropdownActive, setTypeDropdownActive] = useState(false);
    const[topicDropdownActive, setTopicDropdownActive] = useState(false);
    

    const[selectedSide, setSelectedSide] = useState("[side]");
    const[selectedType, setSelectedType] = useState("[type]");
    const[selectedTopic, setSelectedTopic] = useState("[topic]");

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
    let topicDropdownOption =[{
        label:"None",
        value:"None",
        intRep:0,
    },
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
    }];

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
                <div className={`side-dropdown-options ${topicDropdownActive ? "dropdown-visible":""}`}>
                   {topicDropdownOption.map((option, index)=>{
                    return <button className="dropdown-option" key={index} onClick={()=>{
                        setSelectedTopic(option.value);
                        setTopicDropdownActive(false);
                        document.getElementById("side-toggle-3").classList.add("field-filled");
                        if(document.getElementById("side-toggle-3").classList.contains("border")){
                            document.getElementById("side-toggle-3").classList.remove("border");
                            
                        }
                    }}>{option.label}</button>
                   })}
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
                    }}>{option.label}</button>
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

            <div className={`hide-input-fields ${selectedSide !== "[side]" && selectedTopic !=="[topic]" && selectedType !== "[type]" ? "show-input-fields":""}`}>
            <div className="input-field-container">
                <div>
                    <main className="input-header top-input-field">doc info</main>
                    <input id="file-name" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="text" placeholder="file name..."/>
                </div>
                <div>
                    <input id="file-info" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="text" placeholder="file info (optional)..."/>
                </div>
                <div>
                    <input id="file-link" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="text" placeholder="doc link..."/>
                </div>
                <div className="input-container">
                    <main className="input-header">time to read (in seconds) (optional)</main>
                    <input id="min-time" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="number" placeholder="min time (optional)..."/>
                </div>
                <div>
                    <input id="max-time" onChange={()=>{onUserType();}} className="input-field field-unfilled" type="number" placeholder="max time (optional)..."/>
                </div>
            </div>
            <div className="side-dropdown-container">
                 <button id = "submit-button" className="submit-button" onClick={()=>{
                     document.getElementById("submit-button").classList.add("border");
                     setTimeout(()=>{
                         document.getElementById("submit-button").classList.remove("border");
                     }, 500);
                 }}><span>submit</span></button>
            </div>
            </div>
        </div>
    )
}
export default DocCreator;
