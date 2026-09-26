import React from 'react';
import { formatDate, getInitials } from '../../utils/formatters.js';
import { Edit2, Trash2 } from 'lucide-react';

export const NoteCard = ({ note, onEdit, onDelete, canManage }) => {
  const author = note.createdBy || {};

  return (
    <div className="bento-card bg-white rounded-3xl p-6 border border-[#e5e8ec] hover:border-[#0d0f14] flex flex-col justify-between gap-4 transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="text-sm text-[#0e1116] whitespace-pre-wrap leading-relaxed">
        {note.content}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#f0f2f5] text-xs text-[#64748b]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#0d0f14] text-[#e6fd53] border border-black/10 flex items-center justify-center font-bold text-[10px] shadow-xs">
            {getInitials(author.fullName || author.username || 'A')}
          </div>
          <div>
            <span className="font-bold text-[#0e1116]">
              {author.fullName || author.username || 'Admin'}
            </span>
            <span className="text-[11px] text-[#9ca3af] ml-2">
              {formatDate(note.createdAt)}
            </span>
          </div>
        </div>

        {canManage && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(note)}
              className="p-1.5 text-[#64748b] hover:text-[#0e1116] hover:bg-[#f1f3f6] rounded-xl transition-colors"
              title="Edit note"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="p-1.5 text-[#64748b] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Delete note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
