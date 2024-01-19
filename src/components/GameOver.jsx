export default function GameOver({winner, onRestart}) {
    console.log("Inside of GameOver")
    console.log(winner)
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            { winner ? <p>{`${winner} won the Game!`}</p> : <p>It's a Draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    )
}