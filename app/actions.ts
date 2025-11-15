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

export async function createPost(content: string, authorId: string) {
  const validatedFields = postSchema.safeParse({ content });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors.content };
  }

  try {
    // Assuming you have a users collection where you can get the author's name
    const userDoc = await db.collection('users').doc(authorId).get();
    const authorName = userDoc.exists ? userDoc.data()?.username : 'Anonymous'; // Fallback to 'Anonymous'

    await db.collection('posts').add({
      content: validatedFields.data.content,
      authorId: authorId,
      authorName: authorName, // Include authorName
      createdAt: new Date(),
    });
    revalidatePath('/posts'); // Revalidate posts path to show new post
    return { success: "Post created successfully." };
  } catch (error) {
    console.error("Error creating post:", error);
    return { errors: ["Failed to create post." ]};
  }
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
        // Assign a unique Nest ID (could be a generated short code, or simply the UID)
        const nestId = userCredential.user.uid.substring(0, 8); // Example: use first 8 chars of UID as Nest ID
        await db.collection('users').doc(userCredential.user.uid).set({
            username,
            email,
            nestId, // Store the Nest ID
            createdAt: new Date(),
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

export async function searchUserByNestId(nestId: string) {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('nestId', '==', nestId).limit(1).get();

    if (snapshot.empty) {
      return null; // User not found
    }

    const userData = snapshot.docs[0].data();
    return {
      id: snapshot.docs[0].id,
      username: userData.username,
      nestId: userData.nestId,
      // Only return public information
    };
  } catch (error) {
    console.error("Error searching user by Nest ID:", error);
    return { error: "Failed to search for user." };
  }
}

export async function sendConnectionRequest(senderId: string, receiverId: string) {
  if (!senderId || !receiverId) {
    return { error: "Sender ID and Receiver ID are required." };
  }

  if (senderId === receiverId) {
    return { error: "You cannot send a connection request to yourself." };
  }

  try {
    // Check if a request already exists or if they are already connected
    const existingRequest = await db.collection('connectionRequests')
      .where('senderId', '==', senderId)
      .where('receiverId', '==', receiverId)
      .limit(1)
      .get();

    const existingReverseRequest = await db.collection('connectionRequests')
      .where('senderId', '==', receiverId)
      .where('receiverId', '==', senderId)
      .limit(1)
      .get();
    
    // Check for existing direct connection or pending request
    if (!existingRequest.empty && existingRequest.docs[0].data().status !== 'rejected') {
        return { error: "A connection request has already been sent to this user or you are already connected." };
    }
    
    // Check for existing reverse connection or pending request (receiver already sent a request to sender)
    if (!existingReverseRequest.empty && existingReverseRequest.docs[0].data().status === 'pending') {
        // If receiver already sent a pending request to sender, accept it automatically
        await existingReverseRequest.docs[0].ref.update({ status: 'accepted', acceptedAt: new Date() });
        // Also add a reciprocal connection for the sender to receiver
        await db.collection('connectionRequests').add({
            senderId: senderId,
            receiverId: receiverId,
            status: 'accepted', // 'pending', 'accepted', 'rejected'
            createdAt: new Date(),
            acceptedAt: new Date(),
        });
        return { success: "Connection established (request accepted automatically)." };
    } else if (!existingReverseRequest.empty && existingReverseRequest.docs[0].data().status === 'accepted') {
        return { error: "You are already connected with this user." };
    }


    // Create a new connection request
    await db.collection('connectionRequests').add({
      senderId: senderId,
      receiverId: receiverId,
      status: 'pending', // 'pending', 'accepted', 'rejected'
      createdAt: new Date(),
    });

    return { success: "Connection request sent." };
  } catch (error) {
    console.error("Error sending connection request:", error);
    return { error: "Failed to send connection request." };
  }
}

const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  senderId: z.string(),
  receiverId: z.string(),
});

export async function sendMessage(prevState: any, formData: FormData) {
  const validatedFields = messageSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { content, senderId, receiverId } = validatedFields.data;
  const chatDocId = [senderId, receiverId].sort().join('_');

  try {
    const chatRef = db.collection('chats').doc(chatDocId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      await chatRef.set({
        participants: [senderId, receiverId],
        createdAt: new Date(),
      });
    }

    await chatRef.collection('messages').add({
      content,
      senderId,
      timestamp: new Date(),
    });

    revalidatePath(`/chat/${receiverId}`); // Revalidate the chat page for the receiver
    return { success: "Message sent successfully." };

  } catch (error) {
    console.error("Error sending message:", error);
    return { errors: { _form: ["Failed to send message."] } };
  }
}
