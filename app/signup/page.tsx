'use client';

import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Join Nest</h1>
        <p className="text-center text-gray-600 mb-8">First, are you a parent or a child?</p>
        <div className="space-y-4">
          <Link href="/signup/parent" className="block w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            I am a Parent
          </Link>
          <Link href="/signup/child" className="block w-full text-center bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            I am a Child
          </Link>
        </div>
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
