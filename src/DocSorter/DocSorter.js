import React, { useState } from "react";
import '../DocCreator/Dropdown.css'
import './DocSorter.css'


function DocSorter({setSelectedSide, selectedSide, setSelectedTopic, selectedTopic, setSelectedType, selectedType, topicDropdownOption, setSelectedStatus, selectedStatus}){
    const[sideDropdownActive, setSideDropdownActive] = useState(false);
    const[typeDropdownActive, setTypeDropdownActive] = useState(false);
    const[topicDropdownActive, setTopicDropdownActive] = useState(false);
    const [statusDropdownActive, setStatusDropdownActive] = useState(false)

    let itemStatusOptions = [
    {
        label: "Any",
        value:"Any",
        intRep: 1
    },
    {
        value:"None",
        label:"None",
        intRep: 0
      },
      {
        label:"Empty",
        value:"Empt.",
        intRep: 3
      },
      {
        label:"Incomplete",
        value:"Inco.",
        intRep: 2
      },
      {
        label:"Usable",
        value:"Usab.",
        intRep: 2
      },
      {
        label:"Complete",
        value:"Comp.",
        intRep: 1
      }
    ]

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

    
    return(
        <div className="right-dropdowns-container">
             <div className="right-side-dropdown-container">
                <button id ="side-toggle-4" className="side-dropdown-toggle right-dropdown-toggle" onClick={()=>{
                    setTopicDropdownActive(!topicDropdownActive); 
                    //topicDropdownActive ? document.getElementById("side-drop-button-4").innerHTML = "+": document.getElementById("side-drop-button-4").innerHTML = "-";
                    document.getElementById("side-toggle-4").classList.add("border");
                    setTimeout(()=>{
                        document.getElementById("side-toggle-4").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedTopic}</main>        
                    {/* <main id = "side-drop-button-4" className="dropdown-button">+</main>     */}
                </button>
                <div className={`side-dropdown-options ${topicDropdownActive ? "dropdown-visible":""}`}>
                   {topicDropdownOption.map((option, index)=>{
                    return <div className="option-container" key={index}><button className="dropdown-option" onClick={()=>{
                        setSelectedTopic(option.value);
                        setTopicDropdownActive(false);
                        document.getElementById("side-toggle-4").classList.add("field-filled");
                        if(document.getElementById("side-toggle-4").classList.contains("border")){
                            document.getElementById("side-toggle-4").classList.remove("border");                     
                        }

                    }}>{option.value}</button>
                    </div>
                   })}
                </div>
            </div>

            <div className="right-side-dropdown-container">
                <button id ="side-toggle-5" className="side-dropdown-toggle right-dropdown-toggle" onClick={()=>{
                    setSideDropdownActive(!sideDropdownActive); 
                    //sideDropdownActive ? document.getElementById("side-drop-button-5").innerHTML = "+": document.getElementById("side-drop-button-5").innerHTML = "-";
                    document.getElementById("side-toggle-5").classList.add("border");
                
                    setTimeout(()=>{
                        document.getElementById("side-toggle-5").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedSide}</main>        
                    {/* <main id = "side-drop-button-5" className="dropdown-button">+</main>     */}
                </button>
                <div className={`side-dropdown-options ${sideDropdownActive ? "dropdown-visible":""}`}>
                   {sideDropdownOption.map((option, index)=>{
                    return <button className="dropdown-option" key={index} onClick={()=>{
                        setSelectedSide(option.value);
                        setSideDropdownActive(false);
                        document.getElementById("side-toggle-5").classList.add("field-filled");
                        if(document.getElementById("side-toggle-5").classList.contains("border")){
                            document.getElementById("side-toggle-5").classList.remove("border");
                        }
                    }}>{option.value}</button>
                   })}
                </div>
            </div>


            <div className="right-side-dropdown-container">
                <button id ="side-toggle-6" className="side-dropdown-toggle right-dropdown-toggle" onClick={()=>{
                    setTypeDropdownActive(!typeDropdownActive); 
                    //sideDropdownActive ? document.getElementById("side-drop-button-6").innerHTML = "+": document.getElementById("side-drop-button-6").innerHTML = "-";
                    document.getElementById("side-toggle-6").classList.add("border");

                    setTimeout(()=>{
                        document.getElementById("side-toggle-6").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedType}</main>        
                    {/* <main id = "side-drop-button-6" className="dropdown-button">+</main>     */}
                </button>
                <div className={`side-dropdown-options ${typeDropdownActive ? "dropdown-small-visible":""}`}>
                   {typeDropdownOption.map((option, index)=>{
                    return <button className="dropdown-option" key={index} onClick={()=>{
                        setSelectedType(option.value);
                        setTypeDropdownActive(false);
                        document.getElementById("side-toggle-6").classList.add("field-filled");
                        if(document.getElementById("side-toggle-6").classList.contains("border")){
                            document.getElementById("side-toggle-6").classList.remove("border");
                        }
                    }}>{option.label}</button>
                   })}
                </div>
            </div>

            <div className="right-side-dropdown-container">
                <button id ="side-toggle-7" className="side-dropdown-toggle right-dropdown-toggle" onClick={()=>{
                    setStatusDropdownActive(!statusDropdownActive); 
                    document.getElementById("side-toggle-7").classList.add("border");

                    setTimeout(()=>{
                        document.getElementById("side-toggle-7").classList.remove("border");
                    }, 500);
                    }}>
                    <main>{selectedStatus}</main>        
                 
                </button>
                <div className={`side-dropdown-options ${statusDropdownActive ? "dropdown-small-visible":""}`}>
                   {itemStatusOptions.map((option, index)=>{
                    return <button className="dropdown-option" key={index} onClick={()=>{
                        setSelectedStatus(option.value);
                        setStatusDropdownActive(false);
                        document.getElementById("side-toggle-7").classList.add("field-filled");
                        if(document.getElementById("side-toggle-7").classList.contains("border")){
                            document.getElementById("side-toggle-7").classList.remove("border");
                        }
                    }}>{option.label}</button>
                   })}
                </div>
            </div>

        </div>
    )
}
export default DocSorter;
