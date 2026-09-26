import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const { register, loginWithGoogle } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toastError('Google Client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in your frontend .env file.');
      return;
    }

    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        callback: async (tokenResponse) => {
          if (tokenResponse?.access_token) {
            try {
              setLoading(true);
              const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              });
              const profile = await userInfoRes.json();
              await loginWithGoogle({
                email: profile.email,
                fullName: profile.name,
                avatar: profile.picture,
              });
              success(`Welcome to ProjectCamp, ${profile.name}!`);
              navigate('/dashboard', { replace: true });
            } catch (err) {
              toastError(err.message || 'Google registration failed');
            } finally {
              setLoading(false);
            }
          }
        },
      });
      client.requestAccessToken();
    } else if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (response?.credential) {
            try {
              setLoading(true);
              const base64Url = response.credential.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              );
              const profile = JSON.parse(jsonPayload);
              await loginWithGoogle({
                email: profile.email,
                fullName: profile.name || profile.email.split('@')[0],
                avatar: profile.picture || '',
              });
              success(`Welcome to ProjectCamp, ${profile.name}!`);
              navigate('/dashboard', { replace: true });
            } catch (err) {
              toastError(err.message || 'Google registration failed');
            } finally {
              setLoading(false);
            }
          }
        },
      });
      window.google.accounts.id.prompt();
    } else {
      toastError('Google services are still loading. Please try again in a moment.');
    }
  };

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
          Create an Account
        </h1>
        <p className="text-xs text-[#64748b] mt-1.5 text-center">
          Start collaborating on projects with your team today.
        </p>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#e5e8ec] shadow-xl z-10">
        {registeredSuccess ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#0e1116] mb-2">
              Verify Your Email
            </h2>
            <p className="text-xs text-[#64748b] mb-6 leading-relaxed">
              We've dispatched a verification link to <strong className="text-[#0e1116]">{email}</strong>. Please check your inbox and verify your email to get started.
            </p>
            <Link to="/login" className="w-full">
              <Button variant="primary" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#f8fafc] text-[#0e1116] border border-[#e5e8ec] hover:border-[#cbd5e1] font-semibold text-xs sm:text-sm shadow-xs transition-all duration-200 active:scale-[0.98] select-none mb-4 cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center mb-4">
              <div className="flex-grow border-t border-[#e5e8ec]"></div>
              <span className="flex-shrink mx-3 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                or sign up with email
              </span>
              <div className="flex-grow border-t border-[#e5e8ec]"></div>
            </div>

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
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
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
          </>
        )}

        {!registeredSuccess && (
          <div className="pt-6 mt-6 border-t border-[#f0f2f5] text-center text-xs text-[#64748b]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#0e1116] hover:underline font-bold transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
