import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { getInitials } from '../../utils/formatters.js';

export const TestimonialsSection = () => {
  const reviews = [
    {
      name: 'Marcus Vance',
      role: 'Engineering Team Lead',
      quote:
        'ProjectCamp eliminated the visual clutter of bloated enterprise tools. Our developers can see tasks, subtask checklists, and sprint blockers instantly on the Kanban board.',
      team: 'DevOps & Cloud Sprint',
    },
    {
      name: 'Elena Rostova',
      role: 'Product Operations Manager',
      quote:
        'Having project notes, ownership controls, and subtasks right inside the project workspace saved our team hours of lost context between planning meetings and execution.',
      team: 'Platform Architecture',
    },
    {
      name: 'David Kalu',
      role: 'Full-Stack Developer',
      quote:
        'The interface is fast, light, and responsive. Moving tasks from In Progress to Done feels effortless, and managing permissions with verified team members is seamless.',
      team: 'Web Applications',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc]/70 border-t border-[#e5e8ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e8ec] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0d0f14]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e1116]">
              Workflow Experiences
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight">
            Designed for Modern Agile Work
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] mt-4 leading-relaxed">
            See how teams maintain velocity, clarity, and accountability with ProjectCamp's focused project workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bento-card p-6 sm:p-7 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between hover:border-[#0d0f14] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#0e1116] leading-relaxed font-medium italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[#f0f2f5] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {getInitials(rev.name)}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#0e1116]">{rev.name}</p>
                  <p className="text-[10px] text-[#64748b]">
                    {rev.role} • {rev.team}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
