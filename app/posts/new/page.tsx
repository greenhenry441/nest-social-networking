'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { savePost } from '@/app/actions';

const initialState = {
  errors: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
      {pending ? 'Submitting...' : 'Create Post'}
    </button>
  );
}

export default function NewPostPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [state, formAction] = useFormState(savePost, initialState);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-purple-400">Nest</h1>
                <p className="mt-2 text-lg text-gray-300">Loading...</p>
            </div>
        </div>
    );
  }
  
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-xl w-full bg-gray-800 p-8 shadow-2xl rounded-2xl border border-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Create a New Post</h1>
        <form action={(formData) => formAction({ formData, authorId: user.uid, authorName: user.displayName || 'Anonymous' })} className="space-y-6">
          <div>
            <label htmlFor="content" className="sr-only">Post Content</label>
            <textarea id="content" name="content" rows={6} required placeholder="What's on your mind, superstar? ✨" className="w-full px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg"></textarea>
            {state.errors && <p className="text-pink-500 text-sm mt-2">{state.errors.join(', ')}</p>}
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
