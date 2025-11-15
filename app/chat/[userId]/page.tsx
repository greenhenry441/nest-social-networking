import { auth } from '@/lib/firebase/server';
import { db } from '@/lib/firebase/server';
import ChatInterface from '@/components/ChatInterface';
import { notFound } from 'next/navigation';

export default async function ChatPage({ params }: { params: { userId: string } }) {
  const { session } = await auth();
  const currentUser = session?.user;

  if (!currentUser) {
    // Redirect or show an error if the user is not logged in
    return <p>Please log in to chat.</p>;
  }

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
        currentUserId={currentUser.uid}
      />
    </div>
  );
}
