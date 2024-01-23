import Game from './components/Game.jsx';
import { useState } from 'react';
import Welcome from './components/Welcome.jsx';
import GameInfo from './components/GameInfo.jsx';




function App() {

  const [isGameStarted, setGameStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState();
  
  
  function onStartGame(){
     setGameStarted(true);
   
  }

  function onPlay(info){
    setGameInfo(info);
  
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
