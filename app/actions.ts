'use server'

import { z } from 'zod'
import { db } from '@/lib/firebase/server'; // For server-side database operations
import { auth as clientAuth } from '@/lib/firebase/client'; // For client-side auth operations in server actions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const postSchema = z.object({
  content: z.string().min(1, 'Post content cannot be empty'),
})

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const childSignupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password cannot be empty"),
});

export async function savePost(prevState: any, { formData, authorId, authorName }: { formData: FormData, authorId: string, authorName: string }) {
  const validatedFields = postSchema.safeParse({
    content: formData.get('content'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors.content,
    }
  }

  try {
    await db.collection('posts').add({
        content: validatedFields.data.content,
        authorId: authorId,
        authorName: authorName,
        createdAt: new Date(),
      });
    revalidatePath('/posts')
  } catch (e) {
    return { errors: ['Failed to save post.'] }
  }

  redirect('/posts');
}

export async function signUp(prevState: any, formData: FormData) {
    const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password } = validatedFields.data;

    try {
        await createUserWithEmailAndPassword(clientAuth, email, password); // Using client auth
    } catch (e: any) {
        if (e.code === 'auth/email-already-in-use') {
            return { error: 'This email is already in use.' };
        }
        return { error: e.message };
    }

    return { error: null };
}

export async function signUpChild(prevState: any, formData: FormData) {
    const validatedFields = childSignupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { username, email, password } = validatedFields.data;

    try {
        const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password); // Using client auth
        await db.collection('users').doc(userCredential.user.uid).set({
            username,
            email,
        });
    } catch (e: any) {
        if (e.code === 'auth/email-already-in-use') {
            return { error: 'This email is already in use.' };
        }
        return { error: e.message };
    }

    return { error: null };
}


export async function logIn(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    try {
        await signInWithEmailAndPassword(clientAuth, validatedFields.data.email, validatedFields.data.password); // Using client auth
    } catch (e: any) {
        if (e.code === 'auth/invalid-credential') {
            return { errors: { _form: ['Invalid email or password.'] } };
        }
        return { errors: { _form: [e.message] } };
    }

    redirect('/posts');
}
