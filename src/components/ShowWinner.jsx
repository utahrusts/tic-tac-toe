export default function ShowWinner({winner, isGameOver, onRestart, onExit}) {
    let winnerOf = 'Round';
    if(isGameOver){
         winnerOf = 'Game';
    }
    return (
        <div id="overlay-dialog">
           <h2>{`${winnerOf} Over`}</h2> 
            { winner ? <p>{`${winner} won the ${winnerOf}!`}</p> : <p>It is a Draw!</p>}
            <div style={{display: 'flex', gap: '20px'}}>
             <div>{isGameOver? <button onClick={onRestart}>Rematch!</button>: <button onClick={onRestart}>Play Next Round</button>}</div>
             <div><button onClick={onExit}>Exit</button></div>
             </div>
        </div>
    );
}