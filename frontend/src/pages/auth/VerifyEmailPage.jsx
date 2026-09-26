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
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col justify-center items-center px-4 py-12 relative font-['Plus_Jakarta_Sans',sans-serif]">
      <Link
        to="/"
        className="w-full max-w-md flex flex-col items-center mb-8 z-10 group select-none text-center cursor-pointer transition-transform hover:-translate-y-0.5"
        title="Return to Landing Page"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center shadow-lg shadow-black/10 mb-3.5 group-hover:scale-105 transition-transform">
          <FolderKanban className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#0e1116] tracking-tight group-hover:text-black transition-colors">
          Email Verification
        </h1>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#e5e8ec] shadow-xl z-10 text-center">
        {loading ? (
          <div className="py-6">
            <Spinner size="lg" text="Verifying your email token..." />
          </div>
        ) : success ? (
          <div className="flex flex-col items-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-[#0e1116] mb-2">
              Email Verified Successfully!
            </h2>
            <p className="text-xs text-[#64748b] mb-6 leading-relaxed">
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
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-[#0e1116] mb-2">
              Verification Failed
            </h2>
            <p className="text-xs text-rose-700 mb-6 leading-relaxed">
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
