'use client'

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Notifications from './Notifications';

export default function Navbar() {
  const { currentUser, loading } = useAuth();

  return (
    <nav className="glassmorphism p-4 text-accent-foreground fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-4xl font-extrabold text-accent-foreground drop-shadow-md">Nest</Link>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/" className="btn">Home</Link>
            <Link href="/posts" className="btn">Posts</Link>
            {!loading && (
              <>
                {currentUser && (
                  <>
                    <Link href="/profile" className="btn">Profile</Link>
                    <Link href="/connect" className="btn">Connect</Link>
                    <Link href="/chat" className="btn">Chat</Link>
                    <Link href="/posts/new" className="btn bg-primary text-primary-foreground">New Post</Link>
                    <Notifications />
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
