import { db } from '@/lib/firebase/server';
import Post from '@/app/components/Post';

export default async function ForYouPage() {
  const postsSnapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
  const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">For You</h1>
        <div className="space-y-8">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
