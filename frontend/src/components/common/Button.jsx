import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-[#0d0f14] hover:bg-[#1a1d24] text-white shadow-sm border border-black/10 font-semibold',
  lime:
    'bg-[#e6fd53] hover:bg-[#d9f13e] text-[#0d0f14] border border-[#d4ed34] font-bold shadow-sm',
  secondary:
    'bg-white hover:bg-[#f1f3f6] text-[#0e1116] border border-[#e5e8ec] shadow-sm font-semibold',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white shadow-sm font-semibold',
  ghost:
    'bg-transparent hover:bg-[#e5e8ec]/60 text-[#0e1116]',
  outline:
    'bg-transparent hover:bg-white text-[#0e1116] border border-[#e5e8ec] shadow-sm',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5',
  md: 'px-5 py-2 text-xs sm:text-sm rounded-full gap-2',
  lg: 'px-6 py-2.5 text-sm sm:text-base rounded-full gap-2.5',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon: Icon,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
