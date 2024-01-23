export default function Rounds({ rounds, totalRounds, images }) {
  return (
    <div id="round-container">
      <div className="round-section">
        <div className="round-info">Current Round: {rounds.length === totalRounds? rounds.length: rounds.length + 1}</div>
        <div className="round-info">Total Rounds: {totalRounds}</div>
      </div>
      <div className="round-section">
        {rounds.map((round, index) => (
          <div
            key={index}
            style={{ display: 'flex', flexDirection: 'column'}}
          >
            <div className="round-info">{`Round ${index + 1}`} </div>
            <div className="round-info">
             {round !== null && round !== undefined ? <img className="dropdown-option-image" src={images[round]}></img>: 'Draw'} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
