'use client';

import { useAuth } from '@/app/context/AuthContext';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
        {user && (
          <div className="text-center">
            <p className="text-lg">Username: {user.displayName}</p>
            <p className="text-lg">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
