import React from 'react';
import {
  FolderKanban,
  Kanban,
  Users,
  FileText,
  Pin,
  Sparkles,
} from 'lucide-react';

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#f8fafc]/70 border-y border-[#e5e8ec] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e8ec] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0d0f14]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e1116]">
              Core Capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight">
            Manage Projects With Confidence
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] mt-4 leading-relaxed">
            Every tool in ProjectCamp is crafted to eliminate operational friction and keep your team aligned from concept to launch.
          </p>
        </div>

        {/* 4 Feature Bento Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Feature 1: Smart Project Management */}
          <div className="bento-card p-6 sm:p-8 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between hover:border-[#0d0f14] transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center mb-5 shadow-xs">
                <FolderKanban className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                Centralized Workspaces
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e1116] tracking-tight">
                Smart Project Management
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-2 leading-relaxed">
                Create, organize, and monitor all your ongoing projects from one unified dashboard. Filter between owned projects and collaborative workspaces with instant search.
              </p>
            </div>

            {/* Micro UI Preview: Project Card */}
            <div className="mt-6 p-4 rounded-2xl bg-[#f0f2f5] border border-[#e5e8ec]">
              <div className="bento-card bg-white p-4 rounded-xl border border-[#e5e8ec] shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#0d0f14] text-white">
                    Admin Owned
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Sprint
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0e1116]">
                  Cloud Platform API Integration
                </h4>
                <p className="text-[11px] text-[#64748b] mt-1 line-clamp-1">
                  High-throughput microservices architecture with role-based JWT auth.
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#f0f2f5] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>Progress: 75%</span>
                  <div className="w-24 bg-[#f0f2f5] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#0d0f14] h-1.5 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Kanban & Task Tracking */}
          <div className="bento-card p-6 sm:p-8 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between hover:border-[#0d0f14] transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e6fd53] text-[#0d0f14] border border-[#d4ed34] flex items-center justify-center mb-5 shadow-xs">
                <Kanban className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                Visual Workflow
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e1116] tracking-tight">
                Kanban & Task Management
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-2 leading-relaxed">
                Track task status through Todo, In Progress, In Review, and Done. Prioritize with tags (Urgent, High, Medium, Low) and granular subtask checklists.
              </p>
            </div>

            {/* Micro UI Preview: Kanban Columns */}
            <div className="mt-6 p-4 rounded-2xl bg-[#f0f2f5] border border-[#e5e8ec]">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded-xl border border-[#e5e8ec]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#0e1116] mb-1.5">
                    <span>In Progress</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                  <div className="text-[11px] font-bold text-[#0e1116] mb-1">
                    Design System Tokens
                  </div>
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    High Priority
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#e5e8ec]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#0e1116] mb-1.5">
                    <span>Completed</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[11px] font-bold text-[#0e1116] line-through opacity-70 mb-1">
                    User Session Store
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Done
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Team Collaboration & Roles */}
          <div className="bento-card p-6 sm:p-8 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between hover:border-[#0d0f14] transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0d0f14] text-white flex items-center justify-center mb-5 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                Granular Governance
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e1116] tracking-tight">
                Team Collaboration & Roles
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-2 leading-relaxed">
                Invite team members via email or username. Assign Admin privileges or Member access with verified accounts to ensure data security and project integrity.
              </p>
            </div>

            {/* Micro UI Preview: Team Members */}
            <div className="mt-6 p-4 rounded-2xl bg-[#f0f2f5] border border-[#e5e8ec]">
              <div className="space-y-2">
                <div className="bg-white p-2.5 rounded-xl border border-[#e5e8ec] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center text-[10px] font-bold">
                      AC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0e1116]">Alex Chen</p>
                      <p className="text-[10px] text-[#64748b]">alex@projectcamp.app</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#0d0f14] text-white">
                    Project Admin
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-[#e5e8ec] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      SK
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0e1116]">Sarah Kim</p>
                      <p className="text-[10px] text-[#64748b]">sarah@projectcamp.app</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f3f6] text-[#0e1116] border border-[#e5e8ec]">
                    Team Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Project Notes & Specs */}
          <div className="bento-card p-6 sm:p-8 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between hover:border-[#0d0f14] transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#e5e8ec] text-[#0d0f14] flex items-center justify-center mb-5 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                Context & Documentation
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e1116] tracking-tight">
                Project Notes & Specs
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-2 leading-relaxed">
                Attach technical documentation, sprint guidelines, and meeting recaps directly inside your project workspace so critical context is never separated from tasks.
              </p>
            </div>

            {/* Micro UI Preview: Project Note */}
            <div className="mt-6 p-4 rounded-2xl bg-[#f0f2f5] border border-[#e5e8ec]">
              <div className="bento-card bg-white p-3.5 rounded-xl border border-[#e5e8ec] shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-[#0e1116]">Sprint 14 Architecture</span>
                  </div>
                  <span className="text-[9px] text-[#64748b]">Updated 2h ago</span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-relaxed">
                  "API contracts standardized on RESTful JSON. Subtasks must be created before assigning tasks to in-review status."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
