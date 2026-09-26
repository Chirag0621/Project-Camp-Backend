import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 'md', className = '', text = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`animate-spin text-[#0d0f14] ${sizeClasses[size]}`} />
      {text && <span className="text-xs text-[#64748b] font-medium">{text}</span>}
    </div>
  );
};
