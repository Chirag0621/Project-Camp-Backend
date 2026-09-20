import React from 'react';
import { formatDate, getInitials } from '../../utils/formatters.js';
import { Edit2, Trash2 } from 'lucide-react';

export const NoteCard = ({ note, onEdit, onDelete, canManage }) => {
  const author = note.createdBy || {};

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between gap-4 transition-all duration-200 hover:border-slate-700">
      <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
        {note.content}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-[10px] text-indigo-300">
            {getInitials(author.fullName || author.username || 'A')}
          </div>
          <div>
            <span className="font-semibold text-slate-300">
              {author.fullName || author.username || 'Admin'}
            </span>
            <span className="text-[10px] text-slate-500 ml-2">
              {formatDate(note.createdAt)}
            </span>
          </div>
        </div>

        {canManage && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(note)}
              className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Edit note"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
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
