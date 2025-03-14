import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function queryDB(query: string, values?: any[]): Promise<any> {
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
