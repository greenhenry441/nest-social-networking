'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';

export default function GoogleSignInButton() {
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/posts');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-accent text-accent-foreground py-2 px-4 rounded-lg font-semibold shadow-lg hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
    >
      Sign In with Google
    </button>
  );
}