import Player from './Player';
import InfoSelector from './InfoSelector';
import { useState, useRef } from 'react';
import star from '../assets/star.png';
import fire from '../assets/fire.png';
import flower from '../assets/flower.png';
import snowflake from '../assets/snowflake.png';
import diamond from '../assets/diamond.png';
import football from '../assets/football.png';
import {insertLog, getLogs} from '../util/game-log.js'




export default function GameInfo({handlePlay}) {
  
  const [isError, setError] = useState(false);
  
  const gameInfo = useRef({
    players: [{},{}],
    rounds: undefined,
     }).current;
  

  function updatePlayerSymbol(symbol, player){
    const playerInfo = gameInfo.players[player];
    playerInfo.symbol = symbol;
  }
  

  function updatePlayerName(name, player){
    const playerInfo = gameInfo.players[player];
    playerInfo.name = name;
    
  }

  function updateRounds(rounds){
      gameInfo.rounds = rounds;
  }

  function goPlay(){
    if(gameInfo.rounds && 
        gameInfo.players[0].name && 
        gameInfo.players[0].symbol && 
        gameInfo.players[1].name && 
        gameInfo.players[1].symbol){
            insertLog(gameInfo.players[0].symbol.label,gameInfo.players[1].symbol.label,gameInfo.rounds)
            //getLogs();
            handlePlay(gameInfo);
        
    }else{
       setError(true);
    }
  }
  const playerOneSymbols = [
    { label: 'Star', image: star },
    { label: 'Fire', image: fire },
    { label: 'Flower', image: flower },
  ];

  const playerTwoSymbols = [
    { label: 'Snowflake', image: snowflake },
    { label: 'Diamond', image: diamond },
    { label: 'Football', image: football },
  ];

  const roundOptions = [
    {label: '1 Round', value: 1},
    {label: '3 Rounds', value: 3},
    {label: '5 Rounds', value: 5},
    {label: '7 Rounds', value: 7}
  ];

  
  return (
    <div id="overlay-dialog">
      <div id="info-container">
        <div>
          <h2>Game Info</h2>
        </div>
        { isError && <div id="error-text">Please enter all required informattion</div>}
        <div className="players">
          <Player
            initialName="Player 1 Name"
            onChangeName={(name)=>updatePlayerName(name, 0)}
          />
          <Player
            initialName="Player 2 Name"
            onChangeName={(name)=>updatePlayerName(name, 1)}
          />
        </div>
        <div className="selector-div">
            <InfoSelector options={playerOneSymbols} selectText="Player Symbol" handleSelectionChanged={(option)=>{updatePlayerSymbol(option,0);}}></InfoSelector>
            <InfoSelector options={playerTwoSymbols} selectText="Player Symbol" handleSelectionChanged={(option)=>{updatePlayerSymbol(option, 1);}}></InfoSelector>
        </div>
        <div className="selector-div">
          <InfoSelector options={roundOptions} selectText="How Many Rounds?" handleSelectionChanged={(option)=>{updateRounds(option.value);}}></InfoSelector>
        </div>
        <div className="selector-div">
          <p>
            <button onClick={goPlay}>Play</button>
          </p>
        </div>
      </div>
    </div>
  );
}
