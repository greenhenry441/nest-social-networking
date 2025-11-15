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
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-700">
        <div className="p-6">
            <div className="flex items-center mb-5">
                <div className="w-14 h-14 rounded-full bg-gray-700 mr-5 ring-2 ring-purple-500/70 flex-shrink-0">
                    <Image src="/avatar-placeholder.svg" alt="Avatar" width={56} height={56} className="rounded-full"/>
                </div>
                <div>
                    <p className="font-bold text-purple-400 text-lg">{post.authorName}</p>
                    <p className="text-xs text-gray-400">{new Date(post.createdAt?.toDate()).toLocaleString()}</p>
                </div>
            </div>
            <p className="text-gray-200 text-xl mb-6">{post.content}</p>
            <div className="flex items-center justify-between text-gray-400">
                <button onClick={handleLike} className="flex items-center space-x-2 hover:text-pink-500 transition duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">
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
