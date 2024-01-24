import axios from 'axios';


const END_POINT_URL = "https://tic-tac-toe-service.vercel.app/api/"

export const insertLog = async function (symbol1, symbol2, rounds){
    try{
         console.log("Inside of inserLog")
         const headers = {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"}

         const params = { symbol1,symbol2, rounds}

          const data = await axios.get(`${END_POINT_URL}add-log`, 
          {
            params
          },
          {
            headers
          })
          console.log("Done inserting log")
          console.log(JSON.stringify(data));
          const gameId = data.data.result.rows[0].game_id

          return gameId;

    }catch(error){
        console.log(`There was an error inserting the game log: ${error}`);
    }
}

export const updateEndTime = async function (gameId){
    try{
         console.log("Inside of updateEndTime")
         const headers = {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"}

         const params = { gameId }

          const data = await axios.get(`${END_POINT_URL}update-endtime`, 
          {
            params
          },
          {
            headers
          })
          console.log("Done inserting log");
          console.log(JSON.stringify(data));

    }catch(error){
        console.log(`There was an error inserting the game log: ${error}`);
    }
}

export const getLogs = async function (){
    try{
          const data = await axios.get(`${END_POINT_URL}get-logs`)
          return data.data;

    }catch(error){
        console.log(`There was an error inserting the game log: ${error}`);
    }
}