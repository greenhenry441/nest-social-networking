'use client';

import { useFormState } from 'react-dom';
import { signUp } from '@/app/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = { errors: null, error: null };

export default function ParentSignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.error === null && state.errors === undefined) { // Successful signup
      router.push('/login'); // Redirect on success
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="glassmorphism w-full max-w-md p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Create Your Parent Account</h1>
        <form action={formAction}>
          <div className="mb-6">
            <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />
          </div>
          {state?.errors?.confirmPassword && (
            <p className="text-destructive text-sm italic mb-4">{state.errors.confirmPassword.join(', ')}</p>
          )}
          {state?.error && (
            <p className="text-destructive text-sm italic mb-4">{state.error}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              className="btn w-full"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
