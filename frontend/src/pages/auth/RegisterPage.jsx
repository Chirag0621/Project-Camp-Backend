import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useToast } from '../../hooks/useToast.js';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { FolderKanban, UserPlus, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const { register } = useAuth();
  const { success, error: toastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register({
        username: username.trim().toLowerCase(),
        email: email.trim(),
        fullName: fullName.trim(),
        password,
      });

      success('Account registered successfully! Verification email sent.');
      setRegisteredSuccess(true);
    } catch (err) {
      setError(err.message);
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center mb-8 z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-600/30 mb-3">
          <FolderKanban className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Create an Account
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Start collaborating on projects with your team today.
        </p>
      </div>

      <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-slate-800 shadow-2xl z-10">
        {registeredSuccess ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-2">
              Verify Your Email
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              We've dispatched a verification link to <strong className="text-slate-200">{email}</strong>. Please check your inbox and verify your email to get started.
            </p>
            <Link to="/login" className="w-full">
              <Button variant="primary" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <Input
              label="Username *"
              placeholder="e.g. johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              icon={User}
              autoFocus
            />

            <Input
              label="Full Name"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              icon={User}
            />

            <Input
              label="Email Address *"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              icon={Mail}
            />

            <Input
              label="Password *"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              icon={Lock}
            />

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={UserPlus}
              loading={loading}
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>
        )}

        {!registeredSuccess && (
          <div className="pt-6 mt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
