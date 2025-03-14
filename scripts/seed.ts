import { queryDB } from '@/app/lib/data';
import { posts } from '@/app/lib/placeholder-data';

async function seedPosts(): Promise<void> {
  try {
    console.log("Starting database seeding...");

    // Ensure UUID extension exists
    await queryDB(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Create the posts table
    await queryDB(`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v1mc() PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        date TEXT NOT NULL
      );
    `);

    console.log(`Created "posts" table`);

    // Insert posts using pool.query()
    for (const post of posts) {
      await queryDB(
        `INSERT INTO posts (id, title, content, date, author)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING;`,
        [post.id, post.title, post.content, post.date, post.user]
      );
    }

    console.log(`Seeded ${posts.length} posts`);
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

// Run the seeding function
seedPosts().catch((err) => {
  console.error("An error occurred while seeding the database:", err);
});
