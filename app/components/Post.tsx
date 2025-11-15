'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    // Here you would typically update the like count in your database
    setLikes(likes + 1);
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-xl shadow-primary-foreground/20 overflow-hidden mb-8 border border-border">
        <div className="p-6">
            <div className="flex items-center mb-5 gap-x-4">
                <div className="w-10 h-10 rounded-full bg-muted-foreground mr-2 ring-2 ring-accent flex-shrink-0">
                    <Image src="/avatar-placeholder.svg" alt="Avatar" width={40} height={40} className="rounded-full"/>
                </div>
                <div>
                    <p className="font-semibold text-lg">{post.authorName}</p>
                    <p className="text-sm text-muted-foreground">{new Date(post.createdAt?.toDate()).toLocaleString()}</p>
                </div>
            </div>
            <p className="text-base text-card-foreground mb-6">{post.content}</p>
            <div className="flex items-center justify-between text-muted-foreground">
                <button onClick={handleLike} className="flex items-center space-x-2 hover:text-accent transition duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_5px_var(--color-accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                    </svg>
                    <span className="font-semibold text-lg">{likes}</span>
                </button>
            </div>
        </div>
    </div>
  );
}