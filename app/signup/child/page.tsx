'use client';

import { useFormState } from 'react-dom';
import { signUpChild } from '@/app/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = { error: null, success: false };

export default function ChildSignUpPage() {
  const [state, formAction] = useFormState(signUpChild, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/login'); // Redirect to login page upon successful signup
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="glassmorphism w-full max-w-md p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Create Your Child&apos;s Nest</h1>
        <form action={formAction}>
          <div className="mb-6">
            <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor="username">
              Child&apos;s Username
            </label>
            <input
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              id="username"
              type="text"
              name="username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor="email">
              Child&apos;s Email
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
              Child&apos;s Password
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
            <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor="age">
              Child&apos;s Age
            </label>
            <select
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              id="age"
              name="age"
              required
            >
              <option value="">Select Age</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
            </select>
          </div>
          {state?.error && <p className="text-destructive text-sm italic mb-4">{state.error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="btn w-full"
              type="submit"
            >
              Create Nest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
