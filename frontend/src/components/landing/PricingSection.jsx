import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button.jsx';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export const PricingSection = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const includedFeatures = [
    'Unlimited projects and active workspaces',
    'Interactive Kanban board with real-time status updates',
    'Comprehensive task management with priorities & deadlines',
    'Nested subtasks with completion progress tracking',
    'Team member collaboration with Admin & Member roles',
    'In-app project notes and documentation repository',
    'JWT authentication with secure email verification',
    'Responsive interface for desktop, tablet, and mobile',
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e8ec] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0d0f14]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e1116]">
              Workspace Access
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight">
            Clear, Transparent & Free for Teams
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] mt-4 leading-relaxed">
            ProjectCamp is built to empower teams without paywalls, seat fees, or hidden trial limits. Everything you need is unlocked from day one.
          </p>
        </div>

        {/* Highlighted Value Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bento-card p-8 sm:p-12 rounded-3xl border-2 border-[#0d0f14] bg-white shadow-xl relative overflow-hidden">
            {/* Top right corner badge */}
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-full bg-[#e6fd53] text-[#0d0f14] border border-[#d4ed34] text-xs font-black tracking-tight shadow-xs">
                All-Inclusive Access
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-black text-[#0e1116] tracking-tight">
                $0
              </span>
              <span className="text-sm font-bold text-[#64748b]">
                / free forever • no credit card required
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#64748b] max-w-xl leading-relaxed mb-8">
              Full access to complete task management, multi-user project collaboration, and sprint tracking tools.
            </p>

            {/* Checklist of Real Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-[#f0f2f5] mb-8">
              {includedFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-[#0e1116] leading-snug">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA inside Card */}
            <div className="pt-2">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  icon={ArrowRight}
                  className="w-full sm:w-auto shadow-md"
                >
                  Enter My Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  icon={ArrowRight}
                  className="w-full sm:w-auto shadow-md"
                >
                  Create Your Free Account
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
