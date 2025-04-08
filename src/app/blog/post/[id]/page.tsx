import { notFound } from 'next/navigation';
// import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';
import { get } from 'http';
import { PostType } from '@/app/lib/types';


export default async function Page({ params }: { params: { id: string } }) {
  const posts = await getPosts();
  const post = posts.find((p): p is PostType => p.id === params.id);
  
  if (!post) {
    notFound();
  }

  return (
    <>
      <h1>Post</h1>
      {post && <Post {...post} />}
    </>)
    
}