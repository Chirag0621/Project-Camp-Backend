import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service.js';
import { useToast } from '../../hooks/useToast.js';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { FolderKanban, Lock, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetDone, setResetDone] = useState(false);

  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.resetPassword(resetToken, { newPassword });
      success('Password reset successfully!');
      setResetDone(true);
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
          Set New Password
        </h1>
        <p className="text-xs text-[#64748b] mt-1.5 text-center">
          Create a secure new password for your account.
        </p>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#e5e8ec] shadow-xl z-10">
        {resetDone ? (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-base font-bold text-[#0e1116] mb-2">
              Password Updated!
            </h2>
            <p className="text-xs text-[#64748b] mb-6 leading-relaxed">
              Your password has been changed successfully. You can now sign in with your new credentials.
            </p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Sign In Now
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="New Password *"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              icon={Lock}
              autoFocus
            />

            <Input
              label="Confirm New Password *"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              icon={Lock}
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
              Update Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
