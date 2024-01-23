import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const playerName = request.query.playerName;
    const score = request.query.score;
    if (!playerName || !score) throw new Error('Player Name and Score are required');
    if(!Number.isInteger(score)) throw new Error('Score must be an integer');
    await sql`UPDATE score set Score = ${score} where Name=${playerName};`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const scores = await sql`SELECT * FROM score;`;
  return response.status(200).json({ scores });
}