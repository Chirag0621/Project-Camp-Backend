import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Button } from '../common/Button.jsx';
import {
  FolderKanban,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { getInitials } from '../../utils/formatters.js';

export const LandingNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
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
    setUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setUserDropdownOpen(false);
    }, 200);
  };

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#f0f2f5]/90 backdrop-blur-md border-b border-[#e5e8ec] shadow-sm py-3'
          : 'bg-[#f0f2f5]/60 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
            <FolderKanban className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl text-[#0e1116] tracking-tight">
            ProjectCamp
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm font-semibold text-[#64748b] hover:text-[#0e1116] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/dashboard')}
                icon={LayoutDashboard}
                className="shadow-sm"
              >
                My Dashboard
              </Button>

              {/* User Profile Pill with Hover Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#f8fafc] border border-[#e5e8ec] hover:border-[#cbd5e1] shadow-xs transition-all cursor-pointer select-none group"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User account menu"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center text-[10px] font-bold shadow-2xs">
                    {getInitials(user?.fullName || user?.username)}
                  </div>
                  <span className="text-xs font-semibold text-[#0e1116] max-w-[120px] truncate group-hover:text-black">
                    {user?.fullName || user?.username}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#64748b] transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180 text-[#0e1116]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu appearing on hover / click */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#e5e8ec] p-2 overflow-hidden">
                      {/* Identity Header */}
                      <div className="px-3.5 py-3 border-b border-[#f0f2f5] bg-[#fafbfc]/70 rounded-xl mb-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                            {getInitials(user?.fullName || user?.username)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#0e1116] truncate">
                              {user?.fullName || user?.username}
                            </p>
                            <p className="text-[11px] text-[#64748b] truncate">
                              @{user?.username}
                            </p>
                          </div>
                        </div>
                        {user?.email && (
                          <p className="text-[11px] text-[#64748b] truncate mt-2">
                            {user.email}
                          </p>
                        )}
                        {user?.isEmailVerified && (
                          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-emerald-600 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Email Verified</span>
                          </div>
                        )}
                      </div>

                      {/* Menu Options */}
                      <div className="p-1 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            navigate('/dashboard');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0e1116] hover:bg-[#f1f3f6] rounded-xl transition-colors text-left"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#64748b]" />
                          <span>My Dashboard</span>
                        </button>
                      </div>

                      {/* Sign Out Option */}
                      <div className="p-1 border-t border-[#f0f2f5]">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            handleLogout();
                          }}
                          disabled={loggingOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-bold text-[#0e1116] hover:text-[#4b5563] px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/register')}
                icon={ArrowRight}
                className="shadow-sm"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#0e1116] hover:bg-white border border-transparent hover:border-[#e5e8ec] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e8ec] bg-white/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#0e1116] py-1 hover:text-[#64748b] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#e5e8ec] flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2.5 pb-2">
                  <div className="w-7 h-7 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center text-xs font-bold">
                    {getInitials(user?.fullName || user?.username)}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-[#0e1116]">{user?.fullName || user?.username}</p>
                    <p className="text-[#64748b] text-[10px]">@{user?.username}</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  icon={LayoutDashboard}
                  className="w-full"
                >
                  My Dashboard
                </Button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 py-2 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-bold text-[#0e1116] py-2.5 rounded-full border border-[#e5e8ec] hover:bg-[#f1f3f6] transition-colors"
                >
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                  icon={ArrowRight}
                  className="w-full"
                >
                  Get Started Free
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
