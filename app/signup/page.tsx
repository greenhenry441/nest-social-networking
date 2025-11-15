      'use client'

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';

export default function SignupPage() {
  const [formState, action] = useActionState(signup, { errors: {} });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-8 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">Create Your Account</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Join Nest and connect with friends.</p>

        <form action={action}>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="text-sm font-bold text-gray-600 dark:text-gray-300 block mb-2">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                placeholder="Your unique username"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold text-gray-600 dark:text-gray-300 block mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                placeholder="you@example.com"
              />
               {formState.errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formState.errors.email.join(', ')}</p>
              )}
            </div>
            <div>
              <label htmlFor="password_signup" className="text-sm font-bold text-gray-600 dark:text-gray-300 block mb-2">Password</label>
              <input
                id="password_signup"
                type="password"
                name="password"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                placeholder="••••••••"
              />
              {formState.errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formState.errors.password.join(', ')}</p>
              )}
            </div>
          </div>

          {formState.errors._form && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-lg">
              {formState.errors._form.join(', ')}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-8 p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <GoogleSignInButton />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Log in</Link>
        </p>
      </div>
    </div>
  );
}
