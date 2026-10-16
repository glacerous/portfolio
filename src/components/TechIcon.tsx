import React from 'react';

// Crisp, standardized SVG tech icons
export const TechIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-3 h-3" }) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 14.65c.23-.42.45-.88.66-1.38.3-.73.49-1.42.59-2.06.1-.64.15-1.25.15-1.84 0-1.07-.17-1.99-.5-2.77a5.53 5.53 0 0 0-1.46-2.03 6.95 6.95 0 0 0-2.3-1.29c-.89-.3-1.87-.45-2.94-.45H2.57v15.34h3.87v-5.28h2.03c1.07 0 2.05-.14 2.94-.43a6.83 6.83 0 0 0 2.3-1.28c.68-.58 1.18-1.26 1.49-2.03.3-.77.46-1.63.46-2.58 0-.49-.04-.97-.13-1.43zM6.44 5.92h2.03c.6 0 1.12.07 1.56.22.44.15.79.36 1.06.64.27.28.46.62.58 1.02.12.4.18.86.18 1.38 0 .52-.06.98-.18 1.38-.12.4-.31.74-.58 1.02-.27.28-.62.49-1.06.64-.44.15-.96.22-1.56.22H6.44V5.92zm14.69 11.25a6.07 6.07 0 0 0-.69-1.67 4.9 4.9 0 0 0-1.16-1.35c-.47-.37-1.03-.66-1.69-.87-.66-.21-1.4-.31-2.22-.31h-1.56v1.92h1.53c.53 0 .99.07 1.39.2.4.13.73.32.99.56.26.24.45.54.56.9.11.36.17.78.17 1.26 0 .51-.06.94-.18 1.3a2.6 2.6 0 0 1-.54.96c-.24.25-.56.44-.95.57-.39.13-.85.2-1.39.2h-3.95V7.83h3.87c.86 0 1.63.12 2.3.36.67.24 1.23.59 1.68 1.05.45.46.79 1.02 1.01 1.69.22.67.33 1.44.33 2.32 0 .5-.05 1-.15 1.5-.1.5-.26.97-.48 1.41z"/>
        </svg>
      );
    case 'nextjs':
    case 'next':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.82 17.52l-5.64-7.25v7.25H10.5V6.48h1.68l5.64 7.25V6.48h1.68v11.04h-1.68z"/>
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M11.91 0c-3.1 0-5.26.43-5.26 2.5v1.85h5.36v.62H4.15C1.86 4.97 0 6.64 0 9.29c0 2.64 1.76 3.96 4.15 3.96h1.22v-1.85c0-1.86 1.61-3.34 3.47-3.34h5.36V6.17c0-2.07-2.19-2.5-5.29-2.5zm-2.18 1.24a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zM19.85 10.75h-1.22v1.85c0 1.86-1.61 3.34-3.47 3.34H9.8v1.89c0 2.07 2.19 2.5 5.29 2.5 3.1 0 5.26-.43 5.26-2.5v-1.85H15v-.62h7.87c2.29 0 4.15-1.67 4.15-4.32 0-2.64-1.76-3.96-4.15-3.96h-3.02v.02zm-5.58 10.41a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"/>
        </svg>
      );
    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.75 4.5l5.25 7.5h-4.5v7.5l-5.25-7.5h4.5V4.5z"/>
        </svg>
      );
    case 'postgresql':
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
        </svg>
      );
    case 'prisma':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12.63 2.15a1 1 0 0 0-1.26 0L2.3 9.42a1 1 0 0 0-.3.73v9.7a1 1 0 0 0 1.47.88L12 16.27l8.53 4.46a1 1 0 0 0 1.47-.88v-9.7a1 1 0 0 0-.3-.73L12.63 2.15zM12 4.47l6.8 5.44L12 13.9 5.2 9.91 12 4.47z"/>
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M22.5 10.5c-.3-.2-.8-.3-1.3-.2-.3-.5-.7-.9-1.2-1.2l-.7-.4-.4.6c-.3.4-.4.9-.4 1.4-.4.1-.7.4-.9.7l-.4.6.6.4c1.1.8 2.5.9 3.7.3.5-.2.8-.5 1-.9.2-.4.1-.8-.4-1.3zm-8.8-4.4h2.1v2.1h-2.1V6.1zm-3.1 0h2.1v2.1h-2.1V6.1zm-3.1 0h2.1v2.1H7.5V6.1zm-3.1 3.1h2.1v2.1H4.4V9.2zm3.1 0h2.1v2.1H7.5V9.2zm3.1 0h2.1v2.1h-2.1V9.2zm3.1 0h2.1v2.1h-2.1V9.2zm-9.3 3.1h18.2c.2 1.3-.1 2.6-.7 3.7-1.3 2.5-3.8 4.2-6.6 4.5-3.5.4-7-1.1-8.9-4-1-1.4-1.6-3-1.6-4.7l-.4.5z"/>
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    case 'githubactions':
    case 'actions':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.88L9.5 12h3V7.12L16 12h-3v4.88z"/>
        </svg>
      );
    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 6c-3.3 0-5.5 1.7-6.5 5 1.2-1.7 2.7-2.3 4.5-1.8 1 .3 1.8 1.1 2.6 1.9C13.9 12.4 15.6 14 19 14c3.3 0 5.5-1.7 6.5-5-1.2 1.7-2.7 2.3-4.5 1.8-1-.3-1.8-1.1-2.6-1.9C17.1 7.6 15.4 6 12 6zm-7 6c-3.3 0-5.5 1.7-6.5 5 1.2-1.7 2.7-2.3 4.5-1.8 1 .3 1.8 1.1 2.6 1.9C6.9 18.4 8.6 20 12 20c3.3 0 5.5-1.7 6.5-5-1.2 1.7-2.7 2.3-4.5 1.8-1-.3-1.8-1.1-2.6-1.9C10.1 13.6 8.4 12 5 12z"/>
        </svg>
      );
    case 'zustand':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M19.5 7.5L12 3 4.5 7.5v9L12 21l7.5-4.5v-9zM12 5.5l5 3-5 3-5-3 5-3zm-6 4l5 3v6l-5-3v-6zm7 9v-6l5-3v6l-5 3z"/>
        </svg>
      );
    case 'open3d':
    case '3d':
    case 'modal':
    case 'leaflet':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
};
