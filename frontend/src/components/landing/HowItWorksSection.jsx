import React from 'react';
import {
  FolderPlus,
  ListTodo,
  UserCheck,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      badge: 'Account & Setup',
      title: 'Create Your Workspace',
      description:
        'Set up your ProjectCamp account and establish new projects with clear descriptions, milestones, and targets in under a minute.',
      icon: FolderPlus,
      snippet: (
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-[#e5e8ec] mt-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-[#0e1116]">Project Setup</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-[#64748b]">
            <div className="p-1.5 rounded-lg bg-white border border-[#e5e8ec] flex items-center justify-between">
              <span className="font-semibold text-[#0e1116]">Project: SaaS Platform</span>
              <span className="text-[9px] bg-[#e6fd53] text-[#0d0f14] font-extrabold px-1.5 py-0.5 rounded-full">
                Admin
              </span>
            </div>
            <p className="text-[10px] text-[#94a3b8] px-1">Repository & workspace initialized</p>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      badge: 'Sprint Structuring',
      title: 'Organize Tasks & Subtasks',
      description:
        'Break complex goals into granular tasks. Assign priority levels (Urgent, High, Medium, Low), set deadlines, and add checklists.',
      icon: ListTodo,
      snippet: (
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-[#e5e8ec] mt-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#0e1116]">Task Checklist</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              High Priority
            </span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-200/50">
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="line-through text-[10px]">Wireframe UI components</span>
            </div>
            <div className="flex items-center gap-2 text-[#0e1116] bg-white p-1.5 rounded-lg border border-[#e5e8ec]">
              <span className="w-3.5 h-3.5 rounded-full border border-[#cbd5e1]" />
              <span className="text-[10px] font-medium">Connect REST API endpoints</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      badge: 'Team Alignment',
      title: 'Collaborate & Track Progress',
      description:
        'Invite team members as Admins or Members. Update tasks across Kanban columns in real time and hit sprint deadlines reliably.',
      icon: UserCheck,
      snippet: (
        <div className="bg-[#f8fafc] p-3 rounded-2xl border border-[#e5e8ec] mt-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#0e1116]">Sprint Health</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              92% Done
            </span>
          </div>
          <div className="w-full bg-[#e5e8ec] rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-[#0d0f14] h-2 rounded-full w-[92%]" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#64748b]">
            <span>4 Active Collaborators</span>
            <span className="font-bold text-[#0e1116]">On Schedule</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e8ec] shadow-2xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#0d0f14]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0e1116]">
            How It Works
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight">
          Get Started in Three Simple Steps
        </h2>
        <p className="text-sm sm:text-base text-[#64748b] mt-4 max-w-2xl mx-auto leading-relaxed">
          From the first project brainstorm to shipping the final milestone, ProjectCamp keeps your team focused, organized, and accountable.
        </p>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16 text-left">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bento-card p-6 sm:p-7 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between hover:border-[#0d0f14] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-[#0d0f14] tracking-tighter opacity-20 group-hover:opacity-100 group-hover:text-[#0d0f14] transition-opacity">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#f0f2f5] group-hover:bg-[#0d0f14] text-[#0d0f14] group-hover:text-[#e6fd53] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1.5 block">
                    {item.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0e1116] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748b] mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.snippet}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
