'use client';

import React, { useState } from 'react';
import { searchUserByNestId, sendConnectionRequest } from '@/app/actions'; // Import server actions
import { useAuth } from '@/app/context/AuthContext'; // Import useAuth hook

export default function ConnectPage() {
  const [nestIdInput, setNestIdInput] = useState('');
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; nestId: string } | null
  >(null);
  const [statusMessage, setStatusMessage] = useState('');

  const { currentUser, loading: authLoading } = useAuth(); // Get currentUser and authLoading from AuthContext

  const handleSearch = async () => {
    if (authLoading) {
      setStatusMessage('Authenticating... Please wait.');
      return;
    }
    if (!currentUser || !currentUser.uid) {
      setStatusMessage('Please log in to search for users.');
      return;
    }

    setStatusMessage('Searching...');
    setSearchResults(null);

    try {
      const user = await searchUserByNestId(nestIdInput);
      if (user) {
        setSearchResults(user);
        setStatusMessage('');
      } else {
        setStatusMessage('User not found.');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setStatusMessage('Error searching for user. Please try again.');
    }
  };

  const handleConnect = async () => {
    if (!searchResults) return;

    if (authLoading) {
      setStatusMessage('Authenticating... Please wait.');
      return;
    }
    if (!currentUser || !currentUser.uid) {
      setStatusMessage('Please log in to send connection requests.');
      return;
    }

    setStatusMessage(`Sending connection request to ${searchResults.name}...`);
    try {
      const result = await sendConnectionRequest(currentUser.uid, searchResults.id);
      // Assuming result.success is a boolean and result.message is a string
      if (result && result.success) {
        setStatusMessage(`Connection request sent to ${searchResults.name}!`);
      } else {
        setStatusMessage(result && result.message ? result.message : 'Failed to send connection request.');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      setStatusMessage('Error sending connection request. Please try again.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center justify-center">
        <p className="text-xl text-primary">Loading authentication state...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center leading-tight">
        Connect with Friends
      </h1>

      {!currentUser ? (
        <div className="bg-card p-8 rounded-xl shadow-xl border border-border w-full max-w-lg mb-8 text-center text-card-foreground">
          <p className="text-lg font-medium">Please log in to connect with others.</p>
        </div>
      ) : (
        <>
          <div className="bg-card p-8 rounded-xl shadow-xl border border-border w-full max-w-lg mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
              Find by Nest ID
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter Nest ID"
                value={nestIdInput}
                onChange={(e) => setNestIdInput(e.target.value)}
                className="flex-grow p-3 rounded-lg bg-input border border-border text-input-foreground placeholder-input-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 shadow-inner"
                disabled={!currentUser}
              />
              <button
                onClick={handleSearch}
                className="bg-accent text-accent-foreground py-3 px-6 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-foreground focus:ring-offset-2 focus:ring-offset-background shadow-md"
                disabled={!currentUser}
              >
                Search
              </button>
            </div>

            {statusMessage && (
              <p className="text-center text-secondary-foreground mb-4 font-medium">
                {statusMessage}
              </p>
            )}

            {searchResults && (
              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                  Search Results
                </h3>
                <div
                  key={searchResults.id}
                  className="flex items-center justify-between bg-secondary p-4 rounded-lg mb-3 shadow-sm"
                >
                  <span className="text-secondary-foreground font-medium">
                    {searchResults.name} ({searchResults.nestId})
                  </span>
                  <button
                    onClick={handleConnect}
                    className="bg-tertiary text-tertiary-foreground py-2 px-4 rounded-lg font-medium hover:shadow-md transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-tertiary-foreground focus:ring-offset-2 focus:ring-offset-secondary"
                    disabled={!currentUser}
                  >
                    Connect
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground mt-auto">
            <p>Your Nest ID: {currentUser?.uid || '[Loading Nest ID]'}</p>
          </div>
        </>
      )}
    </div>
  );
}