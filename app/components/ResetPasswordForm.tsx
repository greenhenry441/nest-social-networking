'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!oobCode) {
      setError('Invalid password reset link.');
      setVerifying(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => {
        setVerifying(false);
      })
      .catch((e) => {
        setError('Invalid or expired password reset link. Please try again.');
        setVerifying(false);
      });
  }, [oobCode]);

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!oobCode) {
      setError('Invalid password reset link.');
      return;
    }

    if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
    } catch (e: any) {
      setError('Failed to reset password. Please try again.');
    }
  };

  if (verifying) {
    return <div className="min-h-screen flex items-center justify-center"><div>Verifying...</div></div>;
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Password Reset Successful!</h1>
          <p className="mb-4">You can now log in with your new password.</p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Reset Password</h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
