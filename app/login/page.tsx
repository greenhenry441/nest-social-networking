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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full bg-card shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-foreground mb-4">Welcome Back</h1>
          <p className="text-foreground/70 mb-8">Sign in to reconnect with your Nest.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-bold text-foreground/80 block mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full p-4 bg-input border-2 border-border rounded-lg focus:ring-4 focus:ring-primary/30 focus:border-primary text-foreground transition duration-300"
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
                className="w-full p-4 bg-input border-2 border-border rounded-lg focus:ring-4 focus:ring-primary/30 focus:border-primary text-foreground transition duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
              />
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border-l-4 border-destructive text-destructive-foreground rounded-r-lg">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-4 px-4 rounded-lg hover:bg-primary/90 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-lg"
              suppressHydrationWarning
            >
              Log In
            </button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-foreground/60">Or continue with</span>
            </div>
          </div>

          <GoogleSignInButton />

          <div className="mt-8 text-center text-sm text-foreground/70">
            <p>Don&apos;t have an account?{' '} 
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6538b3423b93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
        </div>
      </div>
    </div>
  );
}
