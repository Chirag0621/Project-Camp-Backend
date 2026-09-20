import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderGit2, CheckSquare, Sparkles } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-md hidden md:flex flex-col justify-between p-4 flex-shrink-0">
      <div className="flex flex-col gap-6">
        <div className="px-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
            Menu
          </div>
          <nav className="flex flex-col gap-1.5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span>Projects Dashboard</span>
            </NavLink>
          </nav>
        </div>

        <div className="px-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
            Quick Guide
          </div>
          <div className="glass-card p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Role Permissions</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              <strong className="text-rose-400">Admin:</strong> Manage projects, members & notes.
            </p>
            <p className="leading-relaxed text-[11px]">
              <strong className="text-indigo-400">Project Admin:</strong> Create & update tasks.
            </p>
            <p className="leading-relaxed text-[11px]">
              <strong className="text-slate-300">Member:</strong> View tasks & mark subtasks done.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Project Camp v1.0</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </aside>
  );
};
