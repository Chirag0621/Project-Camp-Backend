import React from 'react';
import { ShieldCheck, Kanban, CheckSquare, FileText } from 'lucide-react';

export const TrustSection = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Role-Based Access',
      desc: 'Admin & Member permission controls',
    },
    {
      icon: Kanban,
      title: 'Live Kanban Boards',
      desc: 'Drag & drop task stage tracking',
    },
    {
      icon: CheckSquare,
      title: 'Actionable Subtasks',
      desc: 'Granular completion checklists',
    },
    {
      icon: FileText,
      title: 'Project Notes',
      desc: 'In-context specs & sprint documentation',
    },
  ];

  return (
    <section className="py-10 border-y border-[#e5e8ec] bg-white/70 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#64748b] mb-6">
          Architected for high-velocity teams and structured project execution
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f8fafc] border border-[#e5e8ec] transition-all hover:bg-white hover:border-[#0d0f14] hover:shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e8ec] flex items-center justify-center text-[#0d0f14] group-hover:bg-[#0d0f14] group-hover:text-[#e6fd53] transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-[#0e1116] truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#64748b] truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
