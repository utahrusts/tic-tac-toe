
import {useState } from 'react';
export default function Player({initialName, symbol, isActive, onChangeName}){

    
    const [isEditing, setIsEditing ] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)
    

    function handleEditClick(){
        setIsEditing((editing)=>!editing);
        if(isEditing){
            console.log("onHandleEditClick: symbol: " + symbol + " " + playerName)
            onChangeName(symbol, playerName)
        }
        
    }

   function handleChange(event){
         console.log(event)
         setPlayerName(event.target.value)
    }

    console.log("Initial name: " + initialName)
    return(
       <li className={isActive? 'active': undefined}>
         <span className="player">
            {isEditing?<input type="text" required value={playerName} onChange={handleChange}></input>: <span className="player-name">{playerName}</span>} 
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleEditClick}>{isEditing? "Save": "Edit"}</button>
         </span>
       </li>
    )
}