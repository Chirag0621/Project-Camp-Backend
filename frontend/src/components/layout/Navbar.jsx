import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { getInitials } from '../../utils/formatters.js';
import { LogOut, FolderKanban, ShieldCheck, ChevronDown, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[#e5e8ec] bg-white/90 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group" title="Return to Landing Page">
          <div className="w-9 h-9 rounded-xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
            <FolderKanban className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-[#0e1116] tracking-tight">
            ProjectCamp
          </span>
        </Link>
      </div>

      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full hover:bg-[#f1f3f6] border border-transparent hover:border-[#e5e8ec] transition-all select-none cursor-pointer group"
          aria-expanded={dropdownOpen}
          aria-label="User profile options"
        >
          <div className="w-9 h-9 rounded-full bg-[#0d0f14] border border-[#1a1d24] flex items-center justify-center text-xs font-bold text-[#e6fd53] shadow-xs">
            {getInitials(user?.fullName || user?.username)}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-[#0e1116] group-hover:text-black">
              {user?.fullName || user?.username}
            </div>
            <div className="text-[10px] text-[#64748b]">@{user?.username}</div>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#64748b] transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180 text-[#0e1116]' : ''
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="bg-white rounded-2xl shadow-xl p-2 border border-[#e5e8ec] overflow-hidden">
              <div className="px-3 py-2.5 border-b border-[#f0f2f5] bg-[#fafbfc]/70 rounded-xl mb-1">
                <p className="text-[10px] font-medium text-[#64748b]">Signed in as</p>
                <p className="text-xs font-bold text-[#0e1116] truncate mt-0.5">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                  {user?.email}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Email Verified</span>
                </div>
              </div>

              <div className="p-1 space-y-0.5">
                <Link
                  to="/"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0e1116] hover:bg-[#f1f3f6] rounded-xl transition-colors text-left"
                >
                  <Home className="w-4 h-4 text-[#64748b]" />
                  <span>Landing Page</span>
                </Link>
              </div>

              <div className="p-1 border-t border-[#f0f2f5]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
