import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { unstable_renderSubtreeIntoContainer } from "react-dom";


const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players){
  let winner = undefined;
  WINNING_COMBINATIONS.forEach((combination)=>{
     const firstSymbol = gameBoard[combination[0].row][combination[0].column]
     const secondSymbol = gameBoard[combination[1].row][combination[1].column]
     const thirdSymbol =  gameBoard[combination[2].row][combination[2].column]

     if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
            winner = players[firstSymbol]
     }
 })
 return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])]

  gameTurns.forEach(turn => {
    const  { square, player} = turn;
    const { row, col} = square;
    gameBoard[row][col] = player;
  });
  return gameBoard;
}

function App() {

  const [players, setPlayers] = useState (PLAYERS)


  const [gameTurns, setGameTurns] = useState([]);

  let currentPlayer = deriveActivePlayer(gameTurns);

  let gameBoard = deriveGameBoard(gameTurns);


 const winner = deriveWinner(gameBoard, players)
 const hasDraw = gameTurns.length === 9 && !winner;

 function handleRestart(){
    setGameTurns([]);
 }

 function handlePlayerNameChange(symbol, newName){
     setPlayers((currPlayers)=>{
          let newPlayers = {...currPlayers,
            [symbol]: newName

          }
          console.log(JSON.stringify(newPlayers))
          return newPlayers
     })
 }

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });

   
  }

  return (
    <main>
      <div id="game-container">
        
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            isActive={currentPlayer === "O"}
            symbol="O"
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
