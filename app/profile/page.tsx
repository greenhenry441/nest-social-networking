'use client';

import { useAuth } from '@/app/context/AuthContext';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login'); // Redirect to login page after logout
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <p className="text-xl text-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!currentUser) {
    // Optionally, you could redirect them to the login page if they are not authenticated
    router.push('/login');
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-border">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">My Profile</h1>
        <div className="text-center space-y-4">
          <p className="text-lg"><span className="font-semibold">Username:</span> {currentUser.displayName || 'N/A'}</p>
          <p className="text-lg"><span className="font-semibold">Email:</span> {currentUser.email}</p>
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-accent hover:bg-opacity-80 text-accent-foreground font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
