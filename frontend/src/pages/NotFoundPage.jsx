import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center p-4 text-center font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="w-16 h-16 rounded-3xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center mb-4 shadow-lg shadow-black/10">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="text-5xl font-extrabold text-[#0e1116] tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-lg font-bold text-[#0e1116] mb-2">
        Page Not Found
      </h2>
      <p className="text-xs text-[#64748b] max-w-sm mb-6 leading-relaxed">
        The page or project you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" icon={ArrowLeft}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
