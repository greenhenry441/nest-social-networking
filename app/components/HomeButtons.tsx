'use client';

import { useRouter } from 'next/navigation';

export default function HomeButtons() {
  const router = useRouter();

  return (
    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
      <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
        <button
          onClick={() => router.push('/signup')}
          className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
        <button
          onClick={() => router.push('/login')}
          className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-purple-600 bg-white hover:bg-purple-50 transition duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </div>
    </div>
  );
}
