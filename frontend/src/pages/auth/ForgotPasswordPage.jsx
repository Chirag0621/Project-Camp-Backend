import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service.js';
import { useToast } from '../../hooks/useToast.js';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { FolderKanban, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const { success, error: toastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.forgotPassword({ email: email.trim() });
      success('Password reset email sent!');
      setSent(true);
    } catch (err) {
      setError(err.message);
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          Reset Password
        </h1>
        <p className="text-xs text-[#64748b] mt-1.5 text-center">
          Enter your registered email to receive a password reset link.
        </p>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#e5e8ec] shadow-xl z-10">
        {sent ? (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-base font-bold text-[#0e1116] mb-2">
              Email Dispatched
            </h2>
            <p className="text-xs text-[#64748b] mb-6 leading-relaxed">
              If an account exists for <strong className="text-[#0e1116]">{email}</strong>, a password reset link has been sent to your inbox.
            </p>
            <Link to="/login" className="w-full">
              <Button variant="primary" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              icon={Mail}
              autoFocus
            />

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="pt-6 mt-6 border-t border-[#f0f2f5] text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#0e1116] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
