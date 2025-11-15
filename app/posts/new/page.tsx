'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // Already imported
import { createPost } from '@/app/actions'; // Import createPost

export default function NewPostPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [postContent, setPostContent] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      setStatusMessage('Post content cannot be empty.');
      return;
    }
    if (!currentUser || !currentUser.uid) {
      setStatusMessage('You must be logged in to post.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Submitting...');

    try {
      const result = await createPost(postContent, currentUser.uid);
      if (result.success) {
        setStatusMessage('Post submitted successfully!');
        setPostContent(''); // Clear the textarea
      } else {
        setStatusMessage(`Error submitting post: ${result.error}`);
      }
    } catch (error: any) {
      setStatusMessage(`An unexpected error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary">Nest</h1>
                <p className="mt-2 text-lg text-secondary">Loading...</p>
            </div>
        </div>
    );
  }
  
  if (!currentUser) {
    // If not loading and no current user, display a message instead of just null or redirecting immediately
    // This allows the user to see why they can't post before the redirect fully takes effect
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
        <div className="max-w-xl w-full bg-card p-8 shadow-xl rounded-2xl border border-border text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">Access Denied</h1>
          <p className="text-lg text-foreground mb-6">Please log in to create a post.</p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-accent text-accent-foreground font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="max-w-xl w-full bg-card p-8 shadow-xl rounded-2xl border border-border">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="content" className="sr-only">Post Content</label>
            <textarea
              id="content"
              name="content"
              rows={6}
              required
              placeholder="What's on your mind, superstar? ✨"
              className="w-full px-5 py-4 bg-input border border-border rounded-xl text-foreground placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-accent transition duration-300 text-lg"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
            {statusMessage && <p className={`text-sm mt-2 ${statusMessage.includes('Error') ? 'text-destructive' : 'text-success'}`}>{statusMessage}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !postContent.trim()}
            className="w-full bg-accent text-accent-foreground font-bold py-3 px-6 rounded-full shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            {isSubmitting ? 'Submitting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}