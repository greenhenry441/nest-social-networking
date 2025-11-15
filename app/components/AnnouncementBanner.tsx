'use client';

import { useState } from 'react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="glassmorphism text-center p-4 bg-orange-500/80 text-white">
      <p className="font-semibold">
        Nest is in Version Alpha, so we are having design/CSS and build issues. Please bear with us as we fix these issues. Thanks, Nest Team
      </p>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute top-2 right-2 text-white font-bold"
        suppressHydrationWarning
      >
        Close Announcement
      </button>
    </div>
  );
}