import React from 'react';

/**
 * Hand-drawn SVG doodle wordmark for "projects" with notebook doodle icon,
 * matching the authentic hand-drawn vector doodle in nexvyn.dev.
 */
export const ProjectsDoodleHeading: React.FC<{ className?: string; color?: string }> = ({
  className = 'h-7 sm:h-8 w-auto text-[#0A0A0A]',
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 170 70"
      className={`select-none overflow-visible ${className}`}
      style={{ color }}
      aria-label="Projects"
      role="img"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Notebook Icon Doodle */}
        <path d="M6.82 20.57C7.5 20.5 9.4 20.4 10.7 20.3C12 20.2 13.3 20 14.6 19.9C15.9 19.7 17.2 19.5 18.5 19.2C19.8 19 21.1 18.7 22.4 18.4C23.6 18.2 24.9 17.9 26.2 17.8C27.5 17.6 29.3 16.6 30.1 17.3C30.9 18 30.6 20.5 30.9 22.1C31.2 23.7 31.5 25.2 31.8 26.8C32.2 28.4 32.5 30 32.8 31.6C33.1 33.2 33.3 34.8 33.5 36.4C33.8 37.9 33.9 39.6 34.1 41.2C34.3 42.8 35.2 45 34.6 46C34 46.9 31.9 46.5 30.5 46.8C29.1 47 27.7 47.3 26.3 47.5C24.9 47.6 23.5 47.8 22.1 47.9C20.7 48 19.2 48.1 17.8 48.2C16.4 48.4 15 48.5 13.6 48.7C12.2 48.9 10.2 50.1 9.5 49.5C8.7 48.8 9.2 46.4 9.1 44.8C9 43.3 9 41.7 8.9 40.2C8.8 38.7 8.7 37.1 8.6 35.6C8.5 34 8.3 32.5 8.1 31C7.9 29.4 7.6 27.9 7.4 26.4C7.2 24.9 6.9 22.6 6.8 21.8" />
        <path d="M11.72 27.63C12.4 27.5 14.3 27.4 15.6 27.1C16.9 26.9 18.2 26.6 19.5 26.3C20.8 26.1 22 25.8 23.3 25.6C24.6 25.5 26.6 25.4 27.2 25.3" />
        <path d="M12.54 34.28C13.2 34.2 15.2 33.8 16.5 33.5C17.8 33.3 19.1 33 20.4 32.8C21.8 32.6 23.1 32.5 24.5 32.4C25.8 32.2 27.8 32.1 28.5 32" />
        <path d="M13.35 40.93C13.9 40.8 15.5 40.3 16.6 40.1C17.8 39.9 18.9 40 20 39.9C21.1 39.8 22.8 39.6 23.4 39.5" />
        {/* 'p' */}
        <path d="M43.16 37.12C43.4 36.8 44.3 35.7 44.8 35.2C45.3 34.8 46 33.8 46.3 34.5C46.5 35.3 46.4 36.9 46.4 39.5C46.4 42.2 46.4 46.2 46.4 50.4C46.4 54.5 46.4 62.2 46.4 64.5" />
        <path d="M46.4 38.74C46.7 38.2 47.4 36.4 48.3 35.6C49.1 34.9 50.4 34.6 51.5 34.4C52.7 34.3 54 34.4 55 34.8C56.1 35.3 57.1 36.1 57.7 37.1C58.4 38.2 58.8 39.8 58.8 41.2C58.9 42.6 58.7 44.3 58.1 45.5C57.6 46.7 56.6 47.7 55.6 48.3C54.6 48.9 53.2 49.2 52.1 49.1C50.9 49.1 49.8 48.7 48.8 48.2C47.9 47.7 46.9 46.4 46.5 46" />
        {/* 'r' */}
        <path d="M63.14 37.12C63.4 36.8 64.1 35.7 64.6 35.2C65.1 34.8 65.7 33.8 66 34.5C66.2 35.3 66.1 37.1 66.1 39.5C66.1 42 66.1 47.4 66.1 49" />
        <path d="M66.11 40.36C66.4 39.8 66.9 37.9 67.6 37C68.2 36.1 69.2 35.4 70 35C70.9 34.6 71.9 34.5 72.7 34.5C73.5 34.6 74.5 35.3 74.9 35.5" />
        {/* 'o' */}
        <path d="M87.71 34.55C87.1 34.7 84.9 34.6 83.8 35.2C82.7 35.8 81.6 36.9 81 38.1C80.3 39.2 79.8 40.7 79.8 42C79.7 43.3 80 44.9 80.6 46C81.2 47.2 82.3 48.2 83.4 48.7C84.5 49.3 85.8 49.5 87 49.3C88.2 49.1 89.6 48.5 90.5 47.6C91.5 46.8 92.1 45.2 92.4 43.9C92.8 42.5 92.7 40.9 92.4 39.5C92.2 38.2 91.6 36.9 90.8 36C90 35.2 88.5 34.7 87.7 34.5C86.9 34.4 86.1 35 85.8 35.1" />
        {/* 'j' */}
        <path d="M97.43 37.12C97.7 36.8 98.4 35.7 98.9 35.2C99.4 34.8 100.1 33.8 100.4 34.5C100.7 35.3 100.6 36.5 100.7 39.5C100.7 42.6 100.7 49.6 100.7 53C100.6 56.5 100.7 58.7 100.4 60.5C100.1 62.3 99.7 63.1 99 63.9C98.4 64.6 97.3 64.9 96.3 64.9C95.4 64.9 93.9 64 93.4 63.9" />
        {/* 'e' */}
        <path d="M107.15 42.25C107.9 42.2 110.3 42.1 111.9 42C113.5 41.9 115.7 41.9 116.9 41.7C118.1 41.6 118.7 41.7 119 41C119.3 40.4 119.2 38.9 118.8 37.9C118.3 36.9 117.3 35.7 116.3 35.1C115.3 34.5 114 34.3 112.8 34.4C111.6 34.5 110.3 35 109.3 35.8C108.3 36.5 107.5 37.8 107 39C106.6 40.2 106.5 41.8 106.6 43.1C106.8 44.4 107.2 45.9 108 46.8C108.7 47.8 109.8 48.6 110.9 49C112.1 49.4 113.5 49.4 114.7 49.3C115.9 49.1 117 48.6 118 48C118.9 47.5 119.8 46.4 120.1 46" />
        {/* 'c' */}
        <path d="M136.31 37.39C136 37 135.2 35.7 134.4 35.2C133.6 34.7 132.5 34.4 131.4 34.4C130.4 34.4 129.2 34.6 128.2 35.2C127.3 35.9 126.3 37 125.8 38.2C125.2 39.4 124.9 40.9 125 42.2C125 43.6 125.3 45.1 125.9 46.2C126.5 47.2 127.6 48.2 128.8 48.7C129.9 49.2 131.4 49.4 132.5 49.3C133.7 49.1 134.9 48.5 135.8 47.9C136.6 47.3 137.3 46.1 137.7 45.8" />
        {/* 't' */}
        <path d="M144.14 24.02C144.1 25.3 144 28.3 144 31.4C144 34.6 143.9 40.3 144 42.9C144.1 45.5 144.3 46.1 144.8 47.1C145.3 48.1 146.3 48.8 147.1 49.1C147.9 49.5 149 49.3 149.8 49C150.6 48.7 151.4 47.8 151.7 47.5" />
        <path d="M139.55 34.69C140.3 34.7 142.3 34.6 144 34.5C145.7 34.5 148.6 34.4 149.5 34.4" />
        {/* 's' */}
        <path d="M166.01 36.58C165.7 36.3 164.9 35.2 164.1 34.8C163.3 34.5 162.1 34.4 161.2 34.4C160.2 34.5 158.9 34.7 158.2 35.2C157.5 35.8 157 36.8 157 37.7C157 38.5 157.4 39.5 158.2 40.1C158.9 40.7 160.3 41 161.4 41.4C162.5 41.9 163.8 42.2 164.7 42.8C165.5 43.4 166.2 44.4 166.3 45.2C166.4 46.1 165.9 47.2 165.2 47.9C164.5 48.6 163.1 49.1 162 49.3C160.8 49.4 159.4 49.2 158.4 48.9C157.5 48.5 156.4 47.4 156 47.1" />
        {/* dot of j */}
        <circle cx="100.6" cy="28.2" r="1.2" fill="currentColor" />
      </g>
    </svg>
  );
};

/**
 * Hand-drawn curved arrow from nexvyn.dev (hero reach out arrow).
 */
export const NexvynReachArrow: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2563EB',
}) => {
  return (
    <svg
      width="34"
      height="61"
      viewBox="0 0 34 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none overflow-visible ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <path
        d="M8.07129 1.70546C10.1876 1.70546 15.0306 1.93827 24.846 2C28.4143 1.58906 29.9666 1.23633 30.9318 1.05996C31.5131 1 32.2806 1 33.0713 1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M33.0005 1.26668C32.7429 4.32319 32.22 7.60065 31.8961 10.2567C31.5221 13.3229 31.182 15.9784 30.7254 23.6136C30.4222 28.684 30.659 38.0061 30.5946 43.0083C30.4909 51.0644 30.0112 56.3943 29.4922 57.8305C29.1671 58.7299 26.8932 57.9379 22.3761 57.7845C11.42 57.7323 3.73609 58.0361 2.89317 58.547C2.43658 58.7542 1.92146 58.8555 1.00049 59.2667"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Hand-drawn horizontal curved arrow pointing left or right (as seen in nexvyn).
 */
export const HandDrawnArrow: React.FC<{
  direction?: 'left' | 'right' | 'up-right';
  className?: string;
  color?: string;
}> = ({ direction = 'left', className = '', color = 'currentColor' }) => {
  if (direction === 'left') {
    return (
      <svg
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none overflow-visible ${className}`}
        style={{ color }}
        aria-hidden="true"
      >
        <path d="M25 9.5C19 11.5 11 11.2 3.5 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7.8 2.6 3.2 6.6 8.6 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (direction === 'right') {
    return (
      <svg
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none overflow-visible ${className}`}
        style={{ color }}
        aria-hidden="true"
      >
        <path d="M1 9.5C7 11.5 15 11.2 22.5 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18.2 2.6 22.8 6.6 17.4 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none overflow-visible ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <path d="M7 17 C 11 13, 14 10, 17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 7 L 17 7 L 17 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * Handwritten annotation note in Caveat font with authentic pen feel and comfortable legible sizing.
 */
export const HandwrittenNote: React.FC<{
  children: React.ReactNode;
  className?: string;
  colorClass?: string;
  rotation?: string;
}> = ({
  children,
  className = '',
  colorClass = 'text-[#2563EB]',
  rotation = '-rotate-2',
}) => {
  return (
    <span
      className={`font-handwriting text-[18px] sm:text-[19px] tracking-wide inline-flex items-center gap-1.5 select-none font-medium leading-none ${colorClass} ${rotation} ${className}`}
    >
      {children}
    </span>
  );
};
