import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderGit2, CheckSquare, Sparkles } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-[#1a1d24] bg-[#0d0f14] text-white hidden md:flex flex-col justify-between p-4 flex-shrink-0">
      <div className="flex flex-col gap-6">
        <div className="px-2">
          <div className="text-[11px] font-bold text-[#8691a7] uppercase tracking-wider mb-3">
            Menu
          </div>
          <nav className="flex flex-col gap-1.5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1c202a] text-[#e6fd53] border border-[#2a303e] shadow-sm'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#151821]'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span>Projects Dashboard</span>
            </NavLink>
          </nav>
        </div>

        <div className="px-2">
          <div className="text-[11px] font-bold text-[#8691a7] uppercase tracking-wider mb-3">
            Quick Guide
          </div>
          <div className="bg-[#141821] p-4 rounded-2xl border border-[#222735] text-xs text-[#9ca3af] space-y-2.5">
            <div className="flex items-center gap-1.5 text-[#e6fd53] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Role Permissions</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              <strong className="text-white">Admin:</strong> Manage projects, members & notes.
            </p>
            <p className="leading-relaxed text-[11px]">
              <strong className="text-[#e6fd53]">Project Admin:</strong> Create & update tasks.
            </p>
            <p className="leading-relaxed text-[11px]">
              <strong className="text-[#cbd5e1]">Member:</strong> View tasks & mark subtasks done.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-[#1a1d24] text-[11px] text-[#8691a7] flex items-center justify-between">
        <span>Project Camp v1.0</span>
        <span className="w-2 h-2 rounded-full bg-[#e6fd53] shadow-sm shadow-[#e6fd53]" />
      </div>
    </aside>
  );
};
