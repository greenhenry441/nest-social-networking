'use client'

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="bg-gray-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-4xl font-bold text-purple-400">Nest</Link>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
            <Link href="/posts" className="text-gray-300 hover:text-white transition duration-300">Posts</Link>
            {!loading && (
              <>
                {user && (
                    <Link href="/posts/new" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition duration-300">New Post</Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
