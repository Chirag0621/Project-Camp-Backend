import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { getInitials } from '../../utils/formatters.js';
import { LogOut, User, FolderKanban, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-800 bg-slate-950/75 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <FolderKanban className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            ProjectCamp
          </span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all select-none"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-200">
              {user?.fullName || user?.username}
            </div>
            <div className="text-[10px] text-slate-400">@{user?.username}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300">
            {getInitials(user?.fullName || user?.username)}
          </div>
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl p-2 z-50 border border-slate-700/60 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-semibold text-slate-200 truncate">
                  {user?.email}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Email Verified</span>
                </div>
              </div>

              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
