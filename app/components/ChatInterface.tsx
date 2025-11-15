'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { sendMessage } from '@/app/actions';
import { db } from '@/lib/firebase/client';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: any; // Firestore timestamp object
}

interface ChatInterfaceProps {
  chatPartnerName: string;
  chatPartnerId: string;
  currentUserId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatPartnerName, chatPartnerId, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [formState, formAction] = useFormState(sendMessage, { errors: {} });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const chatDocId = [currentUserId, chatPartnerId].sort().join('_');
    const messagesRef = collection(db, 'chats', chatDocId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [currentUserId, chatPartnerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const formData = new FormData();
      formData.append('content', newMessage.trim());
      formData.append('senderId', currentUserId);
      formData.append('receiverId', chatPartnerId);

      formAction(formData);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground rounded-lg shadow-xl overflow-hidden p-4 md:p-6">
      <div className="bg-primary-foreground p-3 md:p-4 rounded-t-lg shadow-md flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-primary-text">Chat with {chatPartnerName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md ${
                msg.senderId === currentUserId
                  ? 'bg-accent text-accent-foreground rounded-br-none'
                  : 'bg-muted text-muted-foreground rounded-bl-none'
              }`}
            >
              <p className="text-base">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex p-3 md:p-4 border-t border-border gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-input border border-input focus:ring-2 focus:ring-accent focus:outline-none shadow-sm text-foreground placeholder-muted-foreground"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-accent text-accent-foreground font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:brightness-110"
        >
          Send
        </button>
      </form>
      {formState.errors?._form && <p className="text-red-500 text-sm mt-2">{formState.errors._form.join(', ')}</p>}
    </div>
  );
};

export default ChatInterface;
