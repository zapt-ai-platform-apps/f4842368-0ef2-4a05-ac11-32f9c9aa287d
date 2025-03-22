import React from 'react';

export default function ZaptBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black rounded-lg opacity-80 hover:opacity-100 transition-opacity"
      >
        Made on ZAPT
      </a>
    </div>
  );
}