import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service.js';
import { Spinner } from '../../components/common/Spinner.jsx';
import { Button } from '../../components/common/Button.jsx';
import { FolderKanban, CheckCircle2, XCircle } from 'lucide-react';

export const VerifyEmailPage = () => {
  const { verificationToken } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const performVerification = async () => {
      try {
        await authService.verifyEmail(verificationToken);
        setSuccess(true);
      } catch (err) {
        setErrorMsg(err.message || 'Email verification link is invalid or expired.');
      } finally {
        setLoading(false);
      }
    };

    if (verificationToken) {
      performVerification();
    }
  }, [verificationToken]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center mb-8 z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-600/30 mb-3">
          <FolderKanban className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Email Verification
        </h1>
      </div>

      <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl z-10 text-center">
        {loading ? (
          <div className="py-6">
            <Spinner size="lg" text="Verifying your email token..." />
          </div>
        ) : success ? (
          <div className="flex flex-col items-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-2">
              Email Verified Successfully!
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Your account has been verified. You can now sign in and access your projects.
            </p>
            <Link to="/login" className="w-full">
              <Button variant="primary" className="w-full">
                Proceed to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-2">
              Verification Failed
            </h2>
            <p className="text-xs text-rose-300/80 mb-6 leading-relaxed">
              {errorMsg}
            </p>
            <Link to="/login" className="w-full">
              <Button variant="secondary" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
