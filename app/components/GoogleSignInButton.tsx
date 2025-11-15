'use client';

import { auth } from '@/lib/firebase/client';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-google w-full mt-4"
      suppressHydrationWarning
    >
      Sign In with Google
    </button>
  );
}
