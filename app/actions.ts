'use server'

import { z } from 'zod'
import { db, auth } from '@/lib/firebase/server'; // For server-side database operations
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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
    age: z.string().refine(val => {
        const ageNum = parseInt(val, 10);
        return !isNaN(ageNum) && ageNum >= 8 && ageNum <= 17;
    }, {
        message: "Please select a valid age between 8 and 17.",
    }),
  });

export async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
  const cookieStore = await cookies();
  cookieStore.set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
}

export async function signInWithGoogle(idToken: string) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const username = name || email?.split('@')[0] || 'user';
      const nestEmail = `${username.toLowerCase().replace(/\s+/g, '')}@nestsocial.com`;

      await userRef.set({
        username,
        email,
        photoURL: picture || null,
        nestEmail,
        role: 'child', // Default role
        createdAt: new Date(),
      });
    }

    await createSession(idToken);

    return { success: true };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { success: false, error: "Failed to sign in with Google." };
  }
}

export async function createPost(content: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value

  if (!sessionCookie) {
    return { errors: ["Access Denied: Log in to Post"] };
  }

  let decodedToken;
  try {
    decodedToken = await auth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    return { errors: ["Access Denied: Invalid Session"] };
  }

  const uid = decodedToken.uid;

  const validatedFields = postSchema.safeParse({ content });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors.content };
  }

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
        return { errors: ["User not found."] };
    }
    const authorName = userDoc.data()?.username || 'Anonymous';

    await db.collection('posts').add({
      content: validatedFields.data.content,
      authorId: uid,
      authorName: authorName,
      createdAt: new Date(),
    });
    revalidatePath('/posts');
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
        const userCredential = await auth.createUser({email, password});
        await db.collection('users').doc(userCredential.uid).set({
            email,
            role: 'parent',
            createdAt: new Date(),
        });
        const customToken = await auth.createCustomToken(userCredential.uid);
        return { customToken };
    } catch (e: any) {
        if (e.code === 'auth/email-already-exists') {
            return { error: 'This email is already in use.' };
        }
        return { error: e.message };
    }
}

export async function signUpChild(prevState: any, formData: FormData) {
    const validatedFields = childSignupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { username, email, password, age } = validatedFields.data;
    const ageNum = parseInt(age, 10);
    const nestEmail = `${username.toLowerCase().replace(/\s+/g, '')}@nestsocial.com`;

    try {
        const usernameSnapshot = await db.collection('users').where('username', '==', username).limit(1).get();
        if (!usernameSnapshot.empty) {
            return { error: 'This username is already taken. Please choose another one.' };
        }

        const userCredential = await auth.createUser({email, password, displayName: username});
        const nestId = userCredential.uid.substring(0, 8);
        await db.collection('users').doc(userCredential.uid).set({
            username,
            email,
            nestId,
            nestEmail,
            age: ageNum,
            role: 'child',
            createdAt: new Date(),
        });
        const customToken = await auth.createCustomToken(userCredential.uid);
        return { customToken };
    } catch (e: any) {
        if (e.code === 'auth/email-already-exists') {
            return { error: 'This email is already in use.' };
        }
        return { error: e.message };
    }
}

export async function searchUserByNestEmail(nestEmail: string) {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('nestEmail', '==', nestEmail).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const userData = snapshot.docs[0].data();
    return {
      id: snapshot.docs[0].id,
      username: userData.username,
      nestId: userData.nestId,
      nestEmail: userData.nestEmail,
    };
  } catch (error) {
    console.error("Error searching user by Nest Email:", error);
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
    
    if (!existingRequest.empty && existingRequest.docs[0].data().status !== 'rejected') {
        return { error: "A connection request has already been sent to this or you are already connected." };
    }
    
    if (!existingReverseRequest.empty && existingReverseRequest.docs[0].data().status === 'pending') {
        await existingReverseRequest.docs[0].ref.update({ status: 'accepted', acceptedAt: new Date() });
        await db.collection('connectionRequests').add({
            senderId: senderId,
            receiverId: receiverId,
            status: 'accepted',
            createdAt: new Date(),
            acceptedAt: new Date(),
        });
        return { success: "Connection established (request accepted automatically)." };
    } else if (!existingReverseRequest.empty && existingReverseRequest.docs[0].data().status === 'accepted') {
        return { error: "You are already connected with this user." };
    }


    const requestRef = await db.collection('connectionRequests').add({
      senderId: senderId,
      receiverId: receiverId,
      status: 'pending',
      createdAt: new Date(),
    });

    await db.collection('notifications').add({
        userId: receiverId,
        type: 'connection_request',
        senderId: senderId,
        requestId: requestRef.id, // Link to the connection request
        read: false,
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

    revalidatePath(`/chat/${receiverId}`);
    return { success: "Message sent successfully." };

  } catch (error) {
    console.error("Error sending message:", error);
    return { errors: { _form: ["Failed to send message."] } };
  }
}
