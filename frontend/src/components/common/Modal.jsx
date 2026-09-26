import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 border border-[#e5e8ec] transition-all duration-300 animate-in zoom-in-95 fade-in max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#f0f2f5]">
          <div>
            {title && (
              <h3 className="text-xl font-bold text-[#0e1116] tracking-tight">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-[#64748b] mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-[#0e1116] p-1.5 rounded-full hover:bg-[#f1f3f6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-4 overflow-y-auto pr-1 flex-1">{children}</div>
      </div>
    </div>
  );
};
