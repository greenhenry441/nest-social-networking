"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChatPage() {
  // Mocked data for connected users
  const [connectedUsers] = useState([
    { id: "user123", name: "Alice", nestId: "nest-alice" },
    { id: "user456", name: "Bob", nestId: "nest-bob" },
    { id: "user789", name: "Charlie", nestId: "nest-charlie" },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-primary-dark">My Chats</h1>

        {connectedUsers.length === 0 ? (
          <p className="text-center text-lg text-gray-500">You have no active chats yet. Connect with others!</p>
        ) : (
          <ul className="space-y-4">
            {connectedUsers.map((user) => (
              <li
                key={user.id}
                className="bg-card text-card-foreground p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1"
              >
                <Link href={`/chat/${user.id}`} className="block">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-xl font-bold text-accent-foreground">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">Nest ID: {user.nestId}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}