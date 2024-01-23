export default function Welcome({onStartGame}) {
    return (
        <div id="overlay-dialog">
            <h2>Welcome To Tic Tac Toe</h2>
            <p>
                <button onClick={onStartGame}>Start Game</button>
            </p>
        </div>
    );
}