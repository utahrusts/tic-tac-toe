



export default function GameBoard({onSelectSquare, gameBoard, images}) {
   
  
    return (
         <ol id="game-board">
          {gameBoard.map((row, rowIndex)=>
                <li key={rowIndex}>
                    <ol>
                       {row.map((player,colIndex)=>
                       <li key={colIndex}>
                          <button disabled={player} onClick={()=> onSelectSquare(rowIndex, colIndex)}>
                            {player !== null && <img className="play-image" src={images[player]}></img>}
                          </button>
                        </li>)}
                    </ol>
                </li>)}
         </ol>
    );

}