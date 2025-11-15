/* eslint-disable */
'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import Post from '@/app/components/Post';
import { useAuth } from '@/app/context/AuthContext';

export default function PostsPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (authLoading) return;

      setLoadingPosts(true);
      setError(null);
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (e: any) {
        console.error("Error fetching posts:", e);
        setError("Failed to load posts. Please check your connection or try again later.");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [authLoading]);

  if (authLoading || loadingPosts) {
    return (
      <div className="bg-background text-foreground min-h-screen p-6 flex justify-center items-center">
        <p className="text-xl">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-primary tracking-tight">Community Feed</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {posts.length === 0 && !error ? (
          <p className="text-center text-xl text-muted-foreground">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
