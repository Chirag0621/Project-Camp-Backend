import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-lg font-semibold text-slate-300 mb-2">
        Page Not Found
      </h2>
      <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
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
