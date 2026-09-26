import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, ArrowRight, FolderKanban } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';
import { ROLE_CONFIG } from '../../utils/constants.js';
import { formatDate } from '../../utils/formatters.js';

export const ProjectCard = ({ projectData }) => {
  const navigate = useNavigate();
  if (!projectData) return null;

  const project = projectData.project || projectData;
  const role = projectData.role || project.role || 'member';
  const roleKey = typeof role === 'string' ? role.toLowerCase() : 'member';

  const roleMeta = ROLE_CONFIG[roleKey] || {
    label: role || 'Member',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  };

  const projectId = project._id || projectData._id;

  return (
    <div
      onClick={() => projectId && navigate(`/projects/${projectId}`)}
      className="bento-card bg-white rounded-3xl p-6 border border-[#e5e8ec] flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0d0f14] relative overflow-hidden"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#f1f3f6] border border-[#e5e8ec] flex items-center justify-center text-[#0d0f14] group-hover:bg-[#e6fd53] transition-colors">
            <FolderKanban className="w-5 h-5" />
          </div>
          <Badge className={roleMeta.badge}>{roleMeta.label}</Badge>
        </div>

        <h3 className="font-bold text-base text-[#0e1116] tracking-tight group-hover:text-black transition-colors line-clamp-1 mb-1.5">
          {project?.name || 'Untitled Project'}
        </h3>
        <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed min-h-[32px]">
          {project?.description || 'No description provided.'}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-[#f0f2f5] flex items-center justify-between text-xs text-[#64748b]">
        <div className="flex items-center gap-3.5">
          <span className="flex items-center gap-1.5 hover:text-[#0e1116] transition-colors">
            <Users className="w-3.5 h-3.5 text-[#9ca3af]" />
            <span>{project?.members || 1} {(project?.members || 1) === 1 ? 'member' : 'members'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#9ca3af]" />
            <span>{formatDate(project?.createdAt)}</span>
          </span>
        </div>

        <div className="w-7 h-7 rounded-full bg-[#f1f3f6] flex items-center justify-center text-[#64748b] group-hover:bg-[#0d0f14] group-hover:text-[#e6fd53] transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
