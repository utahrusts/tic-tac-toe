import { useState } from "react";
import GameStats from "./GameStats";
import viewStats from "../assets/view-statistics.svg"

export default function Welcome({onStartGame}) {
     const [showStats, setShowStats] = useState(false)

     function onExit(){
          setShowStats(false)
     }
    
    if(!showStats) return(
        <div id="overlay-dialog">
            <div style={{display: "flex", alignItems: "end", flexDirection: "column", cursor: "pointer"}} onClick={()=>setShowStats(true)}>
            <div style={{display: "flex", alignContent: "center"}}><img alt="View Statistics"  src={viewStats} className="dropdown-option-image"></img></div>
            <div style={{display: "flex", alignContent: "center"}}><p style={{fontSize: "0.75rem", color:"#fcd256"}}>Game Stats</p></div>
            </div>
            <h2>Welcome To Tic Tac Toe</h2>
            <p>
                <button onClick={onStartGame}>Start Game</button>
            </p>
        </div>) 
        
    if(showStats) return( <GameStats onExit={onExit}></GameStats>)

}