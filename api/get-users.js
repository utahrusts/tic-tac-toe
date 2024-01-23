import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const scores = await sql`SELECT * FROM score;`;
  return response.status(200).json({ scores });
}