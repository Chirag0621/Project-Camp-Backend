import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      type = 'text',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || props.name;
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#0e1116] tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 text-[#9ca3af] pointer-events-none">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={computedType}
            className={`w-full rounded-2xl bg-[#f8fafc] border text-[#0e1116] text-sm placeholder:text-[#9ca3af] py-2.5 transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 ${
              Icon ? 'pl-10' : 'pl-4'
            } ${
              isPassword ? 'pr-11' : 'pr-4'
            } ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                : 'border-[#e5e8ec] focus:border-[#0d0f14] focus:ring-[#0d0f14]/10'
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              onMouseDown={(e) => e.preventDefault()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0e1116] hover:bg-[#e2e8f0]/60 active:scale-95 focus:outline-none transition-all cursor-pointer p-1.5 rounded-xl flex items-center justify-center select-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-400 mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

