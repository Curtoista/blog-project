import Post from '@/app/ui/components/posts/Post';
import { queryDB } from '@/app/lib/data';

// Define the Post type based on your database schema
interface PostType {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export default async function Page() {
  let posts: PostType[] = [];

  try {
    const result = await queryDB('SELECT * FROM posts');
    posts = result.rows; // Ensure `queryDB` returns a proper array
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post: PostType) => <Post key={post.id} {...post} />)
      ) : (
        <p className="text-red-500">No posts available</p>
      )}
    </>
  );
}
