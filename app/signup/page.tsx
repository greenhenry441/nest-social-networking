'use client'

import { useActionState } from 'react';
import Link from 'next/link';
import { signUp } from '@/app/actions';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';

export default function SignupPage() {
  const [formState, action] = useActionState(signUp, { nestEmail: null, errors: {} });

  if (formState.nestEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="glassmorphism max-w-md w-full mx-auto p-8">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-foreground">Welcome to Nest!</h1>
          <p className="text-center text-foreground/80 mb-8">Your account has been created.</p>
          <div className="bg-input p-4 rounded-lg text-center">
            <p className="text-sm font-bold text-foreground/80">Your New Nest Email</p>
            <p className="text-lg font-medium text-foreground">{formState.nestEmail}</p>
          </div>
          <Link href="/login" className="btn block w-full mt-8 text-center">
              Continue to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="glassmorphism max-w-md w-full mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-foreground">Create Your Account</h1>
        <p className="text-center text-foreground/80 mb-8">Join Nest and connect with friends.</p>

        <form action={action}>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="text-sm font-bold text-foreground/80 block mb-2">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary text-foreground transition"
                placeholder="Your unique username"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold text-foreground/80 block mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary text-foreground transition"
                placeholder="you@example.com"
              />
               {formState.errors.email && (
                <p className="mt-2 text-sm text-destructive">{formState.errors.email.join(', ')}</p>
              )}
            </div>
            <div>
              <label htmlFor="password_signup" className="text-sm font-bold text-foreground/80 block mb-2">Password</label>
              <input
                id="password_signup"
                type="password"
                name="password"
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary text-foreground transition"
                placeholder="••••••••"
              />
              {formState.errors.password && (
                <p className="mt-2 text-sm text-destructive">{formState.errors.password.join(', ')}</p>
              )}
            </div>
          </div>

          {formState.errors._form && (
            <div className="mt-4 p-3 bg-destructive/20 border border-destructive text-destructive rounded-lg">
              {formState.errors._form.join(', ')}
            </div>
          )}

          <button
            type="submit"
            className="btn w-full mt-8"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <GoogleSignInButton />
        </div>

        <p className="mt-8 text-center text-sm text-foreground/80">
          Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
