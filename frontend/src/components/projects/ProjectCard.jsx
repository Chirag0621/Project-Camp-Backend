import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, ArrowRight, FolderKanban } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';
import { ROLE_CONFIG } from '../../utils/constants.js';
import { formatDate } from '../../utils/formatters.js';

export const ProjectCard = ({ projectData }) => {
  const navigate = useNavigate();
  const { project, role } = projectData;

  const roleMeta = ROLE_CONFIG[role] || {
    label: role,
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  };

  return (
    <div
      onClick={() => navigate(`/projects/${project._id}`)}
      className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/40 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/20 group-hover:text-indigo-300 transition-colors">
            <FolderKanban className="w-5 h-5" />
          </div>
          <Badge className={roleMeta.badge}>{roleMeta.label}</Badge>
        </div>

        <h3 className="font-bold text-base text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1.5">
          {project.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[32px]">
          {project.description || 'No description provided.'}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{project.members || 1} {project.members === 1 ? 'member' : 'members'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatDate(project.createdAt)}</span>
          </span>
        </div>

        <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
