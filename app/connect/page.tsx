'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import SearchBar from '@/app/components/SearchBar';

interface ConnectionRequest {
  id: string;
  senderId: string;
  senderUsername: string;
}

export default function ConnectPage() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.uid) {
      const fetchRequests = async () => {
        setLoading(true);
        const q = query(
          collection(db, 'connectionRequests'),
          where('receiverId', '==', currentUser.uid),
          where('status', '==', 'pending')
        );

        const querySnapshot = await getDocs(q);
        const newRequests: ConnectionRequest[] = [];

        for (const docSnap of querySnapshot.docs) {
          const requestData = docSnap.data();
          const senderDoc = await getDoc(doc(db, 'users', requestData.senderId));
          const senderUsername = senderDoc.data()?.username || 'Anonymous';

          newRequests.push({
            id: docSnap.id,
            senderId: requestData.senderId,
            senderUsername: senderUsername,
          });
        }

        setRequests(newRequests);
        setLoading(false);
      };

      fetchRequests();
    }
  }, [currentUser?.uid]);

  const handleAccept = async (requestId: string) => {
    if (!currentUser?.uid) return;

    try {
      const requestRef = doc(db, 'connectionRequests', requestId);
      await updateDoc(requestRef, { status: 'accepted', acceptedAt: new Date() });
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const requestRef = doc(db, 'connectionRequests', requestId);
      await updateDoc(requestRef, { status: 'rejected' });
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Connect with other Users</h1>
      
      <div className="mb-12">
        <SearchBar />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Incoming Requests</h2>
        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className="flex items-center justify-between p-4 bg-card rounded-lg shadow-md">
                <p>Connection request from <span className="font-semibold">{req.senderUsername}</span></p>
                <div className="flex space-x-2">
                  <button onClick={() => handleAccept(req.id)} className="btn btn-primary">Accept</button>
                  <button onClick={() => handleReject(req.id)} className="btn btn-secondary">Reject</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No new connection requests.</p>
        )}
      </div>
    </div>
  );
}
