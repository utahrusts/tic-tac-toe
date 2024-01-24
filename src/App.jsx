import Game from './components/Game.jsx';
import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import GameInfo from './components/GameInfo.jsx';
import {insertLog, getLogs} from './util/game-log.js'




function App() {

  const [isGameStarted, setGameStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState();
  
  
  function onStartGame(){
     setGameStarted(true);
   
  }

  async function onPlay(info){
    setGameInfo(info);
    const gameId = await insertLog(info.players[0].symbol.label,info.players[1].symbol.label,info.rounds)
    info.gameId = gameId;
  
  }

  function onExit(){
      setGameStarted(false);
      setGameInfo(undefined);
  }

  return (
    <main>
     {isGameStarted? !gameInfo? <GameInfo handlePlay={onPlay}></GameInfo>:<Game gameInfo={gameInfo} onExit={onExit}></Game>:  <Welcome onStartGame={onStartGame}></Welcome>}
    </main>
  );
}

export default App;
