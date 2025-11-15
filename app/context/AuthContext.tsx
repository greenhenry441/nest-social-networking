'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: (User & { isParent?: boolean }) | null;
  currentUser: (User & { isParent?: boolean }) | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, currentUser: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType['currentUser']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setCurrentUser({ ...user, isParent: userDocSnap.data()?.isParent ?? false });
          } else {
            setCurrentUser({ ...user, isParent: false });
          }
        } catch (error) {
          console.error('Failed to fetch user data from Firestore:', error);
          // Set user but indicate an error state or default role
          setCurrentUser({ ...user, isParent: false });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
