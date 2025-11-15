'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover filter saturate-150"
            src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Community"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-blue-500/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Connect, Share, and Grow Together
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            A safe and fun social network for you and your friends. Share your world, discover new things, and make lasting connections.
          </p>
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
        </div>
      </div>
    </div>
  );
}
