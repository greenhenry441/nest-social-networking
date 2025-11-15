'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { createSession } from '@/app/actions';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResetSent(false);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await createSession(idToken);
      router.push('/posts');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    const actionCodeSettings = {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setResetSent(true);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            suppressHydrationWarning
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              suppressHydrationWarning
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              suppressHydrationWarning
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="text-sm text-center">
            <p className="mb-2">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
            <p>
              <button type="button" onClick={handlePasswordReset} className="font-semibold text-blue-600 hover:underline" suppressHydrationWarning>
                Forgot Password?
              </button>
            </p>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {resetSent && <p className="text-green-500 text-sm text-center">Password reset email sent!</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            suppressHydrationWarning
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
