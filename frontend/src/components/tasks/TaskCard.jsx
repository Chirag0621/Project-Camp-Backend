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
      className="bento-card bg-white rounded-2xl p-4 border border-[#e5e8ec] hover:border-[#0d0f14] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group flex flex-col gap-2.5"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-[#0e1116] group-hover:text-black transition-colors line-clamp-2 leading-snug">
          {task.title}
        </h4>
      </div>

      {task.description && (
        <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="pt-2.5 border-t border-[#f0f2f5] flex items-center justify-between text-xs text-[#64748b]">
        <div className="flex items-center gap-2">
          {totalSubtasks > 0 && (
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#4e5870] bg-[#f1f3f6] px-2 py-0.5 rounded-full">
              <CheckSquare className="w-3.5 h-3.5 text-[#0d0f14]" />
              <span>
                {completedSubtasks}/{totalSubtasks}
              </span>
            </span>
          )}

          {attachmentsCount > 0 && (
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#4e5870] bg-[#f1f3f6] px-2 py-0.5 rounded-full">
              <Paperclip className="w-3.5 h-3.5 text-[#64748b]" />
              <span>{attachmentsCount}</span>
            </span>
          )}
        </div>

        <div>
          {task.assignedTo ? (
            <div
              className="w-7 h-7 rounded-full bg-[#0d0f14] text-[#e6fd53] border border-black/10 flex items-center justify-center font-bold text-[10px] shadow-xs"
              title={`Assigned to ${task.assignedTo.fullName || task.assignedTo.username}`}
            >
              {getInitials(task.assignedTo.fullName || task.assignedTo.username)}
            </div>
          ) : (
            <div
              className="w-7 h-7 rounded-full bg-[#f1f3f6] border border-[#e5e8ec] flex items-center justify-center text-[#9ca3af]"
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
