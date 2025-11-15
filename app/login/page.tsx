'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { createSession } from '@/app/actions';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await createSession(idToken);
      router.push('/posts');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="glassmorphism w-full max-w-md mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-foreground">Welcome Back</h1>
        <p className="text-center text-foreground/80 mb-8">Sign in to continue to Nest.</p>
        
        <form onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-bold text-foreground/80 block mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full p-3 bg-input border-border rounded-lg focus:ring-2 focus:ring-primary text-foreground transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
              />
            </div>
            <div>
              <label htmlFor="password_login" className="text-sm font-bold text-foreground/80 block mb-2">Password</label>
              <input
                id="password_login"
                type="password"
                name="password"
                required
                className="w-full p-3 bg-input border-border rounded-lg focus:ring-2 focus:ring-primary text-foreground transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-destructive/20 border border-destructive text-destructive rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn w-full mt-8"
            suppressHydrationWarning
          >
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <GoogleSignInButton />
        </div>

        <div className="mt-8 text-center text-sm text-foreground/80">
          <p>Don&apos;t have an account?</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/signup/parent" className="btn">Sign up as a Parent</Link>
            <Link href="/signup/child" className="btn">Sign up as a Child</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
