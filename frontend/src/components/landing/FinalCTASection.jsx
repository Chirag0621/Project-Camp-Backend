import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button.jsx';
import { ArrowRight, LayoutDashboard } from 'lucide-react';

export const FinalCTASection = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[300px] bg-gradient-to-tr from-[#e6fd53]/25 via-slate-200/40 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bento-card p-8 sm:p-14 lg:p-16 rounded-3xl border border-[#e5e8ec] bg-white text-center shadow-xl relative overflow-hidden">
          {isAuthenticated ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f2f5] border border-[#e5e8ec] text-xs font-bold text-[#0e1116] mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Session
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight max-w-2xl mx-auto">
                Continue Managing Your Projects
              </h2>

              <p className="text-xs sm:text-base text-[#64748b] mt-4 max-w-xl mx-auto leading-relaxed">
                Your workspace, sprint progress, and task checklists are ready. Jump straight into your projects dashboard.
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  icon={LayoutDashboard}
                  className="shadow-lg shadow-black/10"
                >
                  My Dashboard
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6fd53] border border-[#d4ed34] text-xs font-black text-[#0d0f14] mb-5">
                Get Started in Seconds
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight max-w-2xl mx-auto">
                Ready to Manage Your Projects Better?
              </h2>

              <p className="text-xs sm:text-base text-[#64748b] mt-4 max-w-xl mx-auto leading-relaxed">
                Join forward-thinking teams using ProjectCamp for crystal-clear tasks, sprints, and team collaboration.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  icon={ArrowRight}
                  className="w-full sm:w-auto shadow-lg shadow-black/10"
                >
                  Get Started Free
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto"
                >
                  Sign In to Account
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
