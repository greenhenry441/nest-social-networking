'use client';

import { useState } from 'react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="glassmorphism relative p-4">
      <div className="flex flex-col items-center justify-center space-y-4 mx-12">
        <p className="font-semibold text-center">
            Hello! Nest is now in full mode, so alpha and beta testing is over! We now have version 1.0.2. Click the button below to visit the GitHub repository! Thanks, Nest Developers
        </p>
        <a 
            href="https://github.com/greenhenry441/nest-social-networking/tree/M1.MI1.P1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn flex-shrink-0"
        >
            Visit GitHub
        </a>
      </div>
      <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-2 right-3 text-white font-semibold text-lg"
          suppressHydrationWarning
      >
          &times;
      </button>
    </div>
  );
}
