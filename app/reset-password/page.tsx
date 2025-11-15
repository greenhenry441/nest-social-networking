'use client';

import { Suspense } from 'react';
import ResetPasswordForm from '@/app/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div>Loading...</div></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
