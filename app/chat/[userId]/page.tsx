import { db } from '@/lib/firebase/server';
import ChatInterface from '@/app/components/ChatInterface';
import { notFound } from 'next/navigation';

export default async function ChatPage({ params }: { params: { userId: string } }) {

  // This is a temporary workaround to allow the build to pass.
  // We will need to implement proper session management to get the real user ID.
  const currentUserId = "placeholder-user-id"; 

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
