import { Pool } from '@neondatabase/serverless';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { resolve } from 'path';

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

export async function getPosts() {
    try {
        noStore();
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await sql`SELECT * FROM posts`;
        console.log(data.rows)

        // Map and transform the fields to match the expected type
        // return data.rows.map((row) => ({
        //     id: row.post_id?.toString() || row.id?.toString() || 'N/A',  // Ensure string ID
        //     title: row.title || 'Untitled',
        //     content: row.body || row.content || 'No content available',
        //     date: row.created_at || row.date || new Date().toISOString()
        // }));
        return data.rows;
    } catch (error) {
        console.error('Error getting posts', error);
        return [];
    }
}

