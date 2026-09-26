import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button.jsx';
import {
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  CheckSquare,
  ShieldCheck,
  Flame,
  Layers,
  Sparkles,
  Lock,
} from 'lucide-react';

export const HeroSection = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Soft atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-[#e6fd53]/20 via-[#0d0f14]/5 to-[#cbd5e1]/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e8ec] shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="flex h-2 w-2 rounded-full bg-[#0d0f14] relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e6fd53] opacity-75"></span>
          </span>
          <span className="text-xs font-semibold text-[#0e1116] tracking-tight">
            Modern Project Management for Agile Teams
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0e1116] tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Manage Your Projects Smarter,{' '}
          <span className="relative inline-block whitespace-nowrap">
            Built for Teams
            <span className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-3 bg-[#e6fd53]/40 -z-10 rounded-full" />
          </span>{' '}
          That Get Things Done.
        </h1>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base lg:text-lg text-[#64748b] mt-6 max-w-2xl mx-auto leading-relaxed">
          Streamline tasks, collaborate with your team, and track project milestones with ProjectCamp's clean, modern, and distraction-free workspace.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 sm:mt-10">
          {isAuthenticated ? (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/dashboard')}
                icon={LayoutDashboard}
                className="w-full sm:w-auto shadow-md shadow-black/10"
              >
                My Dashboard
              </Button>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center font-semibold text-xs sm:text-sm px-6 py-3 rounded-full bg-white hover:bg-[#f1f3f6] text-[#0e1116] border border-[#e5e8ec] shadow-xs transition-colors"
              >
                Explore Features
              </a>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                icon={ArrowRight}
                className="w-full sm:w-auto shadow-md shadow-black/10"
              >
                Get Started Free
              </Button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center font-semibold text-xs sm:text-sm px-6 py-3 rounded-full bg-white hover:bg-[#f1f3f6] text-[#0e1116] border border-[#e5e8ec] shadow-xs transition-colors"
              >
                See How It Works
              </a>
            </>
          )}
        </div>

        {/* Small trust note */}
        <p className="text-[11px] sm:text-xs text-[#94a3b8] mt-4">
          No credit card required • Instant workspace setup • Free for teams
        </p>

        {/* Floating Product Preview Showcase */}
        <div className="mt-14 sm:mt-16 relative">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-2 bg-gradient-to-b from-[#e6fd53]/15 to-black/5 rounded-[2.5rem] blur-xl -z-10" />

          {/* Browser Window Mockup */}
          <div className="bento-card rounded-3xl border border-[#e5e8ec] bg-white shadow-2xl overflow-hidden text-left mx-auto transition-all duration-300 hover:shadow-black/10">
            {/* Window Title Bar */}
            <div className="h-11 bg-[#f8fafc] border-b border-[#e5e8ec] px-4 sm:px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-black/10" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-black/10" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-black/10" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#e5e8ec] text-[11px] text-[#64748b] font-medium shadow-2xs max-w-xs truncate">
                <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span className="text-[#0e1116] font-semibold">projectcamp.app</span>
                <span className="text-[#94a3b8]">/dashboard</span>
              </div>
              <div className="w-12 hidden sm:block" />
            </div>

            {/* Simulated Live Workspace UI */}
            <div className="p-4 sm:p-7 bg-[#f0f2f5]/60 flex flex-col gap-6">
              {/* Top Banner Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e5e8ec] shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0e1116] mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Live Workspace</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e6fd53] text-[#0d0f14] text-[10px] font-extrabold border border-[#d4ed34]">
                      Sprint 14 Active
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0e1116] tracking-tight">
                    Frontend Re-architecture & Kanban System
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#64748b]">Team:</span>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      AL
                    </div>
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      CK
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#f1f3f6] text-[#0e1116] flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      +4
                    </div>
                  </div>
                </div>
              </div>

              {/* Realistic Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#e5e8ec] shadow-2xs flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-[#64748b]">Total Sprints</p>
                    <p className="text-xl font-extrabold text-[#0e1116] mt-0.5">18 Projects</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#f1f3f6] flex items-center justify-center text-[#0e1116]">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-[#e6fd53] p-4 rounded-2xl border border-[#d4ed34] shadow-2xs flex items-center justify-between text-[#0d0f14]">
                  <div>
                    <p className="text-[11px] font-bold text-[#0d0f14]/80">Active Tasks</p>
                    <p className="text-xl font-black text-[#0d0f14] mt-0.5">42 In Flight</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center text-[#0d0f14]">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-[#0d0f14] p-4 rounded-2xl border border-[#1c202a] shadow-2xs flex items-center justify-between text-white">
                  <div>
                    <p className="text-[11px] font-semibold text-zinc-400">Team Velocity</p>
                    <p className="text-xl font-extrabold text-white mt-0.5">94% On Time</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#e6fd53]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Mini Kanban Board Snippet */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column: In Progress */}
                <div className="bg-white/80 p-3.5 rounded-2xl border border-[#e5e8ec] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0f2f5]">
                    <span className="text-xs font-bold text-[#0e1116] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      In Progress
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      2 Tasks
                    </span>
                  </div>

                  <div className="bento-card bg-white p-3 rounded-xl border border-[#e5e8ec] shadow-2xs hover:border-[#0d0f14] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Urgent
                      </span>
                      <span className="text-[10px] text-[#64748b]">Due Today</span>
                    </div>
                    <p className="text-xs font-bold text-[#0e1116]">
                      Migrate Authentication & Session Store
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0f2f5] text-[10px] text-[#64748b]">
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckSquare className="w-3 h-3" /> 4/5 Subtasks
                      </span>
                      <span className="w-5 h-5 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center font-bold text-[8px]">
                        JD
                      </span>
                    </div>
                  </div>

                  <div className="bento-card bg-white p-3 rounded-xl border border-[#e5e8ec] shadow-2xs hover:border-[#0d0f14] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        High
                      </span>
                      <span className="text-[10px] text-[#64748b]">In 2 Days</span>
                    </div>
                    <p className="text-xs font-bold text-[#0e1116]">
                      Design Neo-Bento Task Cards
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0f2f5] text-[10px] text-[#64748b]">
                      <span className="flex items-center gap-1 text-[#64748b]">
                        <CheckSquare className="w-3 h-3" /> 2/3 Subtasks
                      </span>
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[8px]">
                        CK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column: In Review */}
                <div className="bg-white/80 p-3.5 rounded-2xl border border-[#e5e8ec] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0f2f5]">
                    <span className="text-xs font-bold text-[#0e1116] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                      In Review
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      1 Task
                    </span>
                  </div>

                  <div className="bento-card bg-white p-3 rounded-xl border border-[#e5e8ec] shadow-2xs hover:border-[#0d0f14] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        Reviewing
                      </span>
                      <span className="text-[10px] text-[#64748b]">PR #88</span>
                    </div>
                    <p className="text-xs font-bold text-[#0e1116]">
                      Team Member Role Permissions API
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0f2f5] text-[10px] text-[#64748b]">
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckSquare className="w-3 h-3" /> 3/3 Done
                      </span>
                      <span className="w-5 h-5 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center font-bold text-[8px]">
                        AL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column: Completed */}
                <div className="bg-white/80 p-3.5 rounded-2xl border border-[#e5e8ec] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0f2f5]">
                    <span className="text-xs font-bold text-[#0e1116] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Completed
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      7 Done
                    </span>
                  </div>

                  <div className="bento-card bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                        Shipped
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium">Today</span>
                    </div>
                    <p className="text-xs font-bold text-[#0e1116] line-through opacity-75">
                      Vite 8 Build Optimization & Tailwind 4
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-200 text-[10px] text-emerald-700">
                      <span className="font-semibold">All subtasks verified</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
