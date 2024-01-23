import GameBoard from './GameBoard.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import ShowWinner from './ShowWinner.jsx';
import Rounds from './Rounds.jsx';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length % 2 === 0 ? 0 : 1;
}

function deriveWinner(gameBoard) {
  let winner = undefined;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSymbol !== null &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  });
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  gameTurns.forEach((turn) => {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  });
  return gameBoard;
}

function deriveGameWinner(roundInfo, gameInfo) {
  const player1Count = roundInfo.reduce((acc, curr) => curr === 0 ? acc + 1 : acc, 0);
  const player2Count = roundInfo.reduce((acc, curr) => curr === 1 ? acc + 1 : acc, 0);
  let winner;
  player1Count > player2Count
    ? (winner = gameInfo.players[0].name)
    : player1Count < player2Count
    ? (winner = gameInfo.players[1].name)
    : (winner = undefined);
  return winner;
}

export default function Game({ gameInfo, onExit}) {
  let winner = undefined;
  let hasDraw = false;
  

  const images = gameInfo.players.map((player) => player.symbol.image);

  const [roundInfo, setRoundInfo] = useState([]);
  const [gameTurns, setGameTurns] = useState([]);

  const isGameOver = roundInfo.length === gameInfo.rounds;

  let currentPlayer = deriveActivePlayer(gameTurns);

  let gameBoard = deriveGameBoard(gameTurns);

  let winnerIndex;
  if(isGameOver){
    winner = deriveGameWinner(roundInfo,gameInfo);
    hasDraw = winner === undefined;
  }else{
    winnerIndex = deriveWinner(gameBoard);
    if(winnerIndex != null && winnerIndex != undefined){
        winner = gameInfo.players[winnerIndex].name;
    }
    hasDraw = (gameTurns.length === 9 && winnerIndex === undefined); 
  }
  

  function handleRestart(isGameOver) {
    setGameTurns([]);
    if (isGameOver) {
      setRoundInfo([]);
    }
  }

  function onExitGame(){
    setGameTurns([]);
    setRoundInfo([]);
    onExit();
  }

  function handleSelectSquare(rowIndex, columnIndex) {
    let currentPlayer = deriveActivePlayer(gameTurns);
    const updatedTurns = [
      { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
      ...gameTurns,
    ];
    const gameBoard = deriveGameBoard(updatedTurns);
    const winnerIndex = deriveWinner(gameBoard);

    setGameTurns(updatedTurns);

    if (winnerIndex != undefined || updatedTurns.length === 9) {
      setRoundInfo((prevRounds) => {
        let updatedRounds = [...prevRounds, winnerIndex];
        return updatedRounds;
      });
    }
  }

  return (
    <>
      <Rounds rounds={roundInfo} totalRounds={gameInfo.rounds} images={images}></Rounds>
      <div id="game-container">
        <div className="players">
          <div
            className={currentPlayer === 0 ? 'player active-player' : 'player'}
          >
            <div className="player-name">{gameInfo.players[0].name}</div>
            <div>
              <img
                className="play-image"
                src={gameInfo.players[0].symbol.image}
              ></img>
            </div>
          </div>
          <div
            className={currentPlayer === 1 ? 'player active-player' : 'player'}
          >
            <div className="player-name">{gameInfo.players[1].name}</div>
            <div>
              <img
                className="play-image"
                src={gameInfo.players[1].symbol.image}
              ></img>
            </div>
          </div>
        </div>
        <div>
          {(winner || hasDraw) && (
            <ShowWinner
              winner={winner}
              isGameOver={isGameOver}
              onRestart={() =>
                handleRestart(isGameOver)
              }
              onExit={onExitGame}
            />
          )}
          <GameBoard
            onSelectSquare={handleSelectSquare}
            gameBoard={gameBoard}
            images={images}
          />
        </div>
      </div>
    </>
  );
}
