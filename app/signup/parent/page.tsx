'use client';

import { useFormState } from 'react-dom';
import { signUp } from '@/app/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const initialState = { errors: null, error: null };

export default function ParentSignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.error === null && state.errors === undefined) { // Successful signup
      router.push('/login'); // Redirect on success
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Parent Account</h1>
        <form action={formAction}>
        <input type="hidden" name="isParent" value="true" />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />
          </div>
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm italic mb-4">{state.errors.confirmPassword.join(', ')}</p>
          )}
          {state?.error && (
            <p className="text-red-500 text-sm italic mb-4">{state.error}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500 mt-8">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
