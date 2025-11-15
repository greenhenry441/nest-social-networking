'use client'

import { useActionState, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, createSession } from '@/app/actions';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [formState, action] = useActionState(signUp, { customToken: null, errors: {} });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function handleSignIn() {
      if (formState.customToken) {
        try {
          const userCredential = await signInWithCustomToken(auth, formState.customToken);
          const idToken = await userCredential.user.getIdToken();
          await createSession(idToken);
          router.push('/');
        } catch (error) {
          console.error("Error signing in with custom token:", error);
        }
      }
    }
    handleSignIn();
  }, [formState.customToken, router]);

  return (
    <div className="min-h-screen bg-[#FDF8F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Sign Up</h1>
        <form action={action} className="space-y-4">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {formState.errors.email && (
            <p className="text-sm text-red-500">{formState.errors.email.join(', ')}</p>
          )}
          <div className="relative">
            <input
              id="password_signup"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formState.errors.password && (
            <p className="text-sm text-red-500">{formState.errors.password.join(', ')}</p>
          )}
           <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">{formState.errors.confirmPassword.join(', ')}</p>
          )}
          {formState.error && (
            <p className="text-sm text-red-500">{formState.error}</p>
          )}
          <p className="text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
