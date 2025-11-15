'use client'

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
  const { currentUser, loading } = useAuth();

  return (
    <nav className="bg-primary p-4 shadow-lg drop-shadow-2xl relative z-10 text-accent-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-4xl font-extrabold text-accent-foreground drop-shadow-md">Nest</Link>
          </div>
          <div className="flex items-center space-x-6 md:space-x-10">
            <Link href="/" className="font-bold text-lg md:text-xl hover:text-primary-light transition duration-300">Home</Link>
            <Link href="/posts" className="font-bold text-lg md:text-xl hover:text-primary-light transition duration-300">Posts</Link>
            {!loading && (
              <>
                {currentUser && (
                  <>
                    <Link href="/profile" className="font-bold text-lg md:text-xl hover:text-primary-light transition duration-300">Profile</Link>
                    <Link href="/connect" className="font-bold text-lg md:text-xl hover:text-primary-light transition duration-300">Connect</Link>
                    <Link href="/chat" className="font-bold text-lg md:text-xl hover:text-primary-light transition duration-300">Chat</Link>
                    <Link href="/posts/new" className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border border-transparent text-base font-bold rounded-full text-white bg-accent hover:bg-accent-dark transition duration-300 shadow-md hover:shadow-lg">New Post</Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}