'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/lib/firebase/client';
import { collection, query, where, onSnapshot, doc, getDoc, Timestamp } from 'firebase/firestore';
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Notification {
  id: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationData {
    type: string;
    senderId: string;
    read: boolean;
    createdAt: Timestamp;
    userId: string;
}

interface UserData {
    username: string;
}

function NotificationItem({ notif }: { notif: Notification }) {
  const timeString = notif.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Link href={notif.link} className={`block p-4 hover:bg-secondary ${!notif.read ? 'font-bold' : ''}`}>
      <p className="text-sm">{notif.message}</p>
      <p className="text-xs text-muted-foreground">{timeString}</p>
    </Link>
  );
}

export default function Notifications() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (currentUser?.uid) {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const newNotifications: Notification[] = [];

        for (const docChange of snapshot.docChanges()) {
          if (docChange.type === 'added') {
            const notifData = docChange.doc.data() as NotificationData;
            const notifId = docChange.doc.id;

            if (notifData.type === 'connection_request') {
                const senderDoc = await getDoc(doc(db, "users", notifData.senderId));
                const senderUsername = (senderDoc.data() as UserData)?.username || 'Someone';
                
                newNotifications.push({
                    id: notifId,
                    message: `${senderUsername} sent you a connection request.`,
                    link: `/connect`,
                    read: notifData.read || false,
                    createdAt: notifData.createdAt.toDate(),
                });
            } else {
                // Handle other types of notifications here
            }
          }
        }

        if (newNotifications.length > 0) {
            setNotifications(prev => [...newNotifications, ...prev].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser?.uid]);

  const hasUnread = notifications.some(n => !n.read);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative" suppressHydrationWarning>
        <BellIcon className="h-6 w-6 text-foreground" />
        {hasUnread && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-20">
          <div className="p-4">
            <h3 className="font-bold text-lg">Notifications</h3>
          </div>
          <div className="divide-y divide-border">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <NotificationItem key={notif.id} notif={notif} />
              ))
            ) : (
              <p className="p-4 text-sm text-muted-foreground">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
