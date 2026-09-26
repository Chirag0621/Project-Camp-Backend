import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, ArrowUpRight } from 'lucide-react';

export const LandingFooter = ({ isAuthenticated }) => {
  return (
    <footer className="border-t border-[#e5e8ec] bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand Info */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <FolderKanban className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-[#0e1116] tracking-tight">
                ProjectCamp
              </span>
            </Link>
            <p className="text-xs text-[#64748b] leading-relaxed">
              A modern, intuitive project management workspace engineered for agile teams to organize tasks, track milestones, and ship products faster.
            </p>
          </div>

          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div>
              <p className="font-bold text-[#0e1116] uppercase tracking-wider mb-3">
                Platform
              </p>
              <ul className="space-y-2 text-[#64748b]">
                <li>
                  <a href="#features" className="hover:text-[#0e1116] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-[#0e1116] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-[#0e1116] transition-colors">
                    Capabilities
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#0e1116] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#0e1116] uppercase tracking-wider mb-3">
                Workspace
              </p>
              <ul className="space-y-2 text-[#64748b]">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className="hover:text-[#0e1116] font-semibold text-[#0e1116] flex items-center gap-1 transition-colors"
                      >
                        My Dashboard <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="hover:text-[#0e1116] transition-colors">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="hover:text-[#0e1116] transition-colors">
                        Create Account
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#0e1116] uppercase tracking-wider mb-3">
                Security & Tech
              </p>
              <ul className="space-y-2 text-[#64748b]">
                <li>Role-Based Access</li>
                <li>JWT Security</li>
                <li>Verified Email Flow</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-[#f0f2f5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94a3b8]">
          <p>© {new Date().getFullYear()} ProjectCamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
