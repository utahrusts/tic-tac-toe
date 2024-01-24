import { getLogs } from "../util/game-log.js";
import { useEffect, useState } from "react";
import flowerImg from "../assets/flower.png";
import fireImg from "../assets/fire.png";
import footballImg from "../assets/football.png";
import snowflakeImg from "../assets/snowflake.png";
import starImg from "../assets/star.png";
import diamondImg from "../assets/diamond.png";

function getAverageRounds(logData) {
  const sum = logData.reduce((prev, curr) => prev + curr.rounds, 0);
  let avg = sum / logData.length;
  return Number.parseFloat(avg).toFixed(2);
}

function getAverageDuration(logData) {
  const finishedGames = logData.filter((el) => el.duration);
  const count = finishedGames.length;
  const dates = finishedGames.reduce((prev, curr) => prev + curr.duration, 0);

  const avgDur = dates / count;
  return Number.parseFloat(avgDur).toFixed(2);
}

function getUnifishedGames(logData) {
  const count = logData.reduce(
    (prev, curr) => (!curr.end_time ? prev + 1 : prev),
    0
  );
  return count;
}

function getSymbolRankings(logData) {
  let result = [];
  if (logData) {
    const flower = {
      image: flowerImg,
      count: logData.reduce(
        (prev, curr) => (curr.symbol1 === "Flower" ? prev + 1 : prev),
        0
      ),
    };
    const diamond = {
      image: diamondImg,
      count: logData.reduce(
        (prev, curr) => (curr.symbol2 === "Diamond" ? prev + 1 : prev),
        0
      ),
    };
    const star = {
      image: starImg,
      count: logData.reduce(
        (prev, curr) => (curr.symbol1 === "Star" ? prev + 1 : prev),
        0
      ),
    };

    const snowflake = {
      count: logData.reduce(
        (prev, curr) => (curr.symbol2 === "Snowflake" ? prev + 1 : prev),
        0
      ),
      image: snowflakeImg,
    };
    const football = {
      count: logData.reduce(
        (prev, curr) => (curr.symbol2 === "Football" ? prev + 1 : prev),
        0
      ),
      image: footballImg,
    };

    const fire = {
      count: logData.reduce(
        (prev, curr) => (curr.symbol1 === "Fire" ? prev + 1 : prev),
        0
      ),
      image: fireImg,
    };
    const arr = [flower, diamond, star, snowflake, football, fire];
    result = arr.sort((el1, el2) =>
      el1.count < el2.count ? 1 : el1.count > el2.count ? -1 : 0
    );
  }
  return result;
}

function getLongestAndShortest(logData) {
  const result = {
    shortestGame: 0,
    longestGame: 0,
  };
  const dates = logData
    .filter((el) => el.start_time && el.end_time)
    .map((el) => el.duration)
    .sort((el1, el2) => (el1 < el2 ? 1 : el1 > el2 ? -1 : 0));
  console.log(JSON.stringify(dates));
  result.longestGame = dates[0];
  result.shortestGame = dates[dates.length - 1];
  return result;
}

export default function GameStats({ onExit }) {
  const [logData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let avgRounds = 0;
  let avgDuration = 0;
  let symbolRankings = getSymbolRankings(logData);
  let unfinishedGames = 0;
  let longestShortest = undefined;
  console.log(JSON.stringify(symbolRankings));
  let displayLogData = logData;
  if (logData) {
    displayLogData = logData.map((el) => {
      let duration = undefined;
      if (el.end_time) {
        const dt1 = new Date(el.start_time);
        const dt2 = new Date(el.end_time);
        duration = (dt2 - dt1) / 1000;
      }
      return {
        ...el,
        duration,
      };
    });
    avgRounds = getAverageRounds(logData);
    avgDuration = getAverageDuration(displayLogData);
    longestShortest = getLongestAndShortest(displayLogData);
    unfinishedGames = getUnifishedGames(logData);
  }
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getLogs();
        setData(data.gameLog.rows);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div id="overlay-dialog">
        <div>
          <h2>Tic Tac Toe Game Stats</h2>
        </div>
        <div>Loading Statistics....</div>
      </div>
    );
  } else
    return (
      <div id="overlay-dialog">
        <div>
          <h2>Tic Tac Toe Game Stats</h2>
        </div>
        <div id="stat-container">
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              font: "inherit",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: "#e1dec7",
            }}
          >
            <div style={{ fontWeight: "bold", paddingTop: "15px" }}>
              Symbol Rankings By Usage
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                paddingTop: "15px",
              }}
            >
              {symbolRankings.map((rank, index) => {
                return (
                  <div key={index} style={{ paddingTop: "15px" }}>
                    <img className="dropdown-option-image" src={rank.image} />{" "}
                    {rank.count}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              font: "inherit",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: "#e1dec7",
            }}
          >
            <div style={{ fontWeight: "bold", paddingTop: "15px" }}>
              Average Rounds:
            </div>
            <div>{avgRounds}</div>
            <div style={{ fontWeight: "bold", paddingTop: "15px" }}>
              Average Game Duration:{" "}
            </div>
            <div>{avgDuration} Seconds</div>
            <div style={{ fontWeight: "bold", paddingTop: "15px" }}>
              Shortest Game:{" "}
            </div>
            <div>
              {longestShortest ? longestShortest.shortestGame : 0} Seconds
            </div>
            <div style={{ fontWeight: "bold", paddingTop: "15px" }}>
              Longest Game:{" "}
            </div>
            <div>
              {longestShortest ? longestShortest.longestGame : 0} Seconds
            </div>
            <div style={{ fontWeight: "bold", paddingTop: "15px" }}>
              Unfinished Games:{" "}
            </div>
            <div> {unfinishedGames}</div>
          </div>
          <div></div>
        </div>
        <button onClick={onExit}>Back</button>
      </div>
    );
}
