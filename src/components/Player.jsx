
import {useState } from 'react';
export default function Player({initialName, onChangeName}){

    
    const [playerName, setPlayerName] = useState('');
    

   function handleChange(event){
         setPlayerName(event.target.value);
    }

    return(
       <div id="player-div">
         <span>
             <input id="player-input" maxLength="10" type="text" required placeholder={initialName} value={playerName} onChange={handleChange} onBlur={()=>onChangeName(playerName)}></input>         
         </span>
       </div>
    );
}