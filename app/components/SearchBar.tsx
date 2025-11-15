'use client';

import { useState } from 'react';
import { searchUserByNestEmail, sendConnectionRequest } from '@/app/actions';
import { useAuth } from '@/app/context/AuthContext';

interface SearchResult {
  id: string;
  username: string;
  nestId: string;
  nestEmail: string;
}

export default function SearchBar() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setSearchResult(null);

    if (!query.trim()) {
      setError("Please enter a Nest Email to search.");
      return;
    }

    const result = await searchUserByNestEmail(query.trim());

    if (result && !result.error) {
      setSearchResult(result as SearchResult);
    } else {
      setError("User not found.");
    }
  };

  const handleConnect = async () => {
    if (searchResult && currentUser?.uid) {
      const result = await sendConnectionRequest(currentUser.uid, searchResult.id);
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccessMessage(result.success);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Nest Email..."
          className="flex-1 p-2 border rounded-l-lg"
        />
        <button type="submit" className="p-2 bg-primary text-white rounded-r-lg">
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {searchResult && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p><strong>Username:</strong> {searchResult.username}</p>
          <p><strong>Nest ID:</strong> {searchResult.nestId}</p>
          <p><strong>Nest Email:</strong> {searchResult.nestEmail}</p>
          {currentUser && currentUser.uid !== searchResult.id && (
            <button onClick={handleConnect} className="mt-2 p-2 bg-blue-500 text-white rounded-lg">
              Connect
            </button>
          )}
        </div>
      )}
    </div>
  );
}
