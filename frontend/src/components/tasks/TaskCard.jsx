import React from 'react';
import { CheckSquare, Paperclip, User } from 'lucide-react';
import { getInitials } from '../../utils/formatters.js';

export const TaskCard = ({ task, onClick, onStatusChange, canEdit }) => {
  const completedSubtasks = (task.subtasks || []).filter((s) => s.isCompleted).length;
  const totalSubtasks = (task.subtasks || []).length;
  const attachmentsCount = (task.attachments || []).length;

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl p-4 border border-slate-800/80 hover:border-indigo-500/40 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5 group flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
          {task.title}
        </h4>
      </div>

      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {totalSubtasks > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {completedSubtasks}/{totalSubtasks}
              </span>
            </span>
          )}

          {attachmentsCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Paperclip className="w-3.5 h-3.5 text-slate-400" />
              <span>{attachmentsCount}</span>
            </span>
          )}
        </div>

        <div>
          {task.assignedTo ? (
            <div
              className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-[10px] text-indigo-300"
              title={`Assigned to ${task.assignedTo.fullName || task.assignedTo.username}`}
            >
              {getInitials(task.assignedTo.fullName || task.assignedTo.username)}
            </div>
          ) : (
            <div
              className="w-7 h-7 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center text-slate-500"
              title="Unassigned"
            >
              <User className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
