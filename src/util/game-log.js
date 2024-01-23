import axios from 'axios';


const END_POINT_URL = "https://tic-tac-toe-service.vercel.app/api/"

export const insertLog = async function (symbol1, symbol2, rounds){
    try{
         console.log("Inside of inserLog")
         const headers = {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"}

          await axios.post(`${END_POINT_URL}add-log`,{
             symbol1,
             symbol2,
             rounds
          }, {
            headers
          })
          console.log("Done inserting log")
          return;

    }catch(error){
        console.log(`There was an error inserting the game log: ${error}`);
    }
}

export const getLogs = async function (){
    try{
         console.log("Inside of getLogs")
          const data = await axios.get(`${END_POINT_URL}get-logs`)
          console.log("Done getting logs");
          JSON.stringify(data);
          return;

    }catch(error){
        console.log(`There was an error inserting the game log: ${error}`);
    }
}