



export default function GameBoard({onSelectSquare, gameBoard}) {
   
  
    return (
         <ol id="game-board">
          {gameBoard .map((row, rowIndex)=>
                <li key={rowIndex}>
                    <ol>
                       {row.map((playerSymbol,colIndex)=>
                       <li key={colIndex}>
                          <button disabled={playerSymbol} onClick={()=> onSelectSquare(rowIndex, colIndex)}>
                            {playerSymbol}
                          </button>
                        </li>)}
                    </ol>
                </li>)}
         </ol>
    )

}