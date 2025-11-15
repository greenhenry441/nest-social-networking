import { db, auth } from '@/lib/firebase/server';
import ChatInterface from '@/app/components/ChatInterface';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function ChatPage({ params }: { params: { userId: string } }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value

  if (!sessionCookie) {
    return notFound();
  }

  let decodedToken;
  try {
    decodedToken = await auth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    return notFound();
  }

  const currentUserId = decodedToken.uid;
  const chatPartnerId = params.userId;
  const userDoc = await db.collection('users').doc(chatPartnerId).get();

  if (!userDoc.exists) {
    return notFound();
  }

  const chatPartner = userDoc.data();

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-100px)]">
      <ChatInterface
        chatPartnerName={chatPartner?.username || 'User'}
        chatPartnerId={chatPartnerId}
        currentUserId={currentUserId}
      />
    </div>
  );
}
