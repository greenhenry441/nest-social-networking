'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/lib/firebase/client';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import Post from '@/app/components/Post';

export default function PostsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        setDataLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  if (loading || dataLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-purple-400">Nest</h1>
                <p className="mt-2 text-lg text-gray-300">Loading posts...</p>
            </div>
        </div>
    );
  }

  if (!user) {
      return null;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-purple-400 tracking-tight">Community Feed</h1>
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-2xl">
              <p className="text-xl">No posts yet. Be the first to share something! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
