import { sql } from '@vercel/postgres';
 
export default async function handler(
  request,
  response
) {
  try {
    const result =
      await sql`CREATE TABLE game_log (game_id SERIAL PRIMARY KEY, symbol1 VARCHAR(255) NOT NULL, symbol2 VARCHAR(255) NOT NULL, rounds INTEGER NOT NULL, start_time TIMESTAMPTZ, end_time TIMESTAMPTZ);`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}