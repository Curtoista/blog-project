import { Pool } from '@neondatabase/serverless';
import { sql } from '@vercel/postgres';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function connectToDB() {
    try {
        const client = await pool.connect();
        console.log('Connected to database');
        return client;  // Use this client for queries
    } catch (error) {
        console.error('Error connecting to database', error);
        throw error;
    }
}

export async function  getPosts() {
    try {
        const data = await sql `SELECT * FROM posts LIMIT 10`
        // console.log(data.rows)
        return data.rows;
    } catch (error) {
        console.error('Error getting posts', error);
    }
}