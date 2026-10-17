import React from 'react';

/**
 * Animated wavy hand-drawn squiggle underline for links (matching nexvyn.dev style).
 * It animates smoothly when the parent .group is hovered.
 */
export const ScribbleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2563EB',
}) => {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 -bottom-1.5 w-full h-[6px] overflow-visible ${className}`}
      fill="none"
      preserveAspectRatio="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 60 14"
    >
      <path
        className="stroke-draw-hover"
        d="M1 10 C 10 3, 16 12, 26 6 C 34 1, 44 11, 59 5"
        pathLength="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

/**
 * Organic curved hand-drawn arrow pointing down and right/left.
 */
export const CurvedDoodleArrow: React.FC<{
  direction?: 'down-left' | 'down-right' | 'up-right';
  className?: string;
  color?: string;
}> = ({ direction = 'down-left', className = '', color = 'currentColor' }) => {
  if (direction === 'down-left') {
    return (
      <svg
        width="38"
        height="44"
        viewBox="0 0 38 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none overflow-visible ${className}`}
        style={{ color }}
        aria-hidden="true"
      >
        {/* Curved stem */}
        <path
          d="M34 3 C 33 16, 26 31, 8 36"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrow tip */}
        <path
          d="M14 29 L 6 36 L 12 42"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'down-right') {
    return (
      <svg
        width="38"
        height="44"
        viewBox="0 0 38 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none overflow-visible ${className}`}
        style={{ color }}
        aria-hidden="true"
      >
        <path
          d="M4 3 C 6 17, 14 31, 31 36"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 29 L 32 36 L 26 42"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none overflow-visible ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <path
        d="M6 26 C 11 18, 17 11, 26 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17 5 L 26 6 L 25 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Hand-drawn doodle star (as seen next to headers & stars in nexvyn)
 */
export const DoodleStar: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2563EB',
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block select-none overflow-visible ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <path
        d="M12 2 C 12.2 6.5, 14.5 10, 22 12 C 14.5 14, 12.2 17.5, 12 22 C 11.8 17.5, 9.5 14, 2 12 C 9.5 10, 11.8 6.5, 12 2 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
    </svg>
  );
};

/**
 * Hand-drawn loose doodle loop / circle highlight around text or badge
 */
export const DoodleHighlightCircle: React.FC<{
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}> = ({ children, className = '', strokeColor = '#2563EB' }) => {
  return (
    <span className={`relative inline-flex items-center justify-center px-1.5 py-0.5 ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] overflow-visible"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 40"
      >
        <path
          d="M 6,22 C 4,11 25,4 52,4 C 84,4 98,11 96,22 C 94,33 68,37 42,37 C 18,37 3,29 5,18"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.65"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
};

/**
 * Handwritten annotation note in Caveat font with gentle angle and authentic pen feel
 */
export const HandwrittenNote: React.FC<{
  children: React.ReactNode;
  className?: string;
  colorClass?: string;
  rotation?: string;
}> = ({
  children,
  className = '',
  colorClass = 'text-blue-600',
  rotation = '-rotate-3',
}) => {
  return (
    <span
      className={`font-handwriting text-[17px] sm:text-[19px] tracking-wide inline-flex items-center gap-1.5 select-none ${colorClass} ${rotation} ${className}`}
    >
      {children}
    </span>
  );
};
