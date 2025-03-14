import { Pool } from '@neondatabase/serverless';

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
