import React from 'react';

export const Badge = ({ children, className = '', dot = false, dotColor = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border tracking-tight transition-all ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColor || 'bg-current'
          }`}
        />
      )}
      {children}
    </span>
  );
};
