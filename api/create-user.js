import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const playerName = request.query.playerName;
    const score = request.query.score;
    if (!playerName || !score) throw new Error('Player Name and Score are required');
    await sql`INSERT INTO score (Name, Score, Last_game_dt) VALUES (${playerName}, ${score}, CURRENT_TIMESTAMP);`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const scores = await sql`SELECT * FROM score;`;
  return response.status(200).json({ scores });
}