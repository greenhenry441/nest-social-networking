'use client'

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { signUp } from '@/app/actions';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';

export default function SignupPage() {
  const [formState, action] = useFormState(signUp, { errors: {} });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Join Nest</h1>
          <p className="mt-2 text-gray-600">Create your account to start sharing</p>
        </div>
        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
            {formState.errors?.email && (
              <p className="text-sm text-red-500">{formState.errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
            {formState.errors?.password && (
              <p className="text-sm text-red-500">{formState.errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
            {formState.errors?.confirmPassword && (
              <p className="text-sm text-red-500">{formState.errors.confirmPassword}</p>
            )}
          </div>
            {formState.errors?._form && (
                <div className="text-red-500 text-sm">
                {formState.errors._form.join(', ')}
                </div>
            )}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <GoogleSignInButton />
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
