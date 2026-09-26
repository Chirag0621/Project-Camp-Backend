import React, { useState } from 'react';
import { taskService } from '../../services/task.service.js';
import { useToast } from '../../hooks/useToast.js';
import { Check, Plus, Trash2, Loader2 } from 'lucide-react';

export const SubtaskList = ({
  projectId,
  taskId,
  subtasks = [],
  onSubtasksUpdated,
  canManageSubtasks = false, // Admin / Project Admin
  draftTitle = '',
  onDraftSubtaskChange,
}) => {
  const [newTitle, setNewTitle] = useState(draftTitle);
  const [adding, setAdding] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const { success, error } = useToast();

  const completedCount = subtasks.filter((s) => s.isCompleted).length;
  const percentage = subtasks.length > 0 ? Math.round((completedCount / subtasks.length) * 100) : 0;

  const handleToggle = async (subtask) => {
    try {
      setTogglingId(subtask._id);
      await taskService.updateSubTask(projectId, subtask._id, {
        isCompleted: !subtask.isCompleted,
      });
      onSubtasksUpdated();
    } catch (err) {
      error(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleAddSubtask = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (!newTitle.trim()) return;

    try {
      setAdding(true);
      await taskService.createSubTask(projectId, taskId, {
        title: newTitle.trim(),
      });
      success('Subtask added!');
      setNewTitle('');
      if (onDraftSubtaskChange) onDraftSubtaskChange('');
      onSubtasksUpdated();
    } catch (err) {
      error(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteSubtask = async (subTaskId) => {
    try {
      await taskService.deleteSubTask(projectId, subTaskId);
      success('Subtask removed!');
      onSubtasksUpdated();
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-semibold text-[#0e1116]">
        <span className="tracking-tight">
          Subtasks ({completedCount}/{subtasks.length})
        </span>
        <span className="text-[#0d0f14] font-bold">{percentage}%</span>
      </div>

      {subtasks.length > 0 && (
        <div className="w-full h-2 bg-[#f0f2f5] border border-[#e5e8ec] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0d0f14] rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {/* Subtask items */}
      <div className="flex flex-col gap-1.5 mt-1">
        {subtasks.map((s) => {
          const isToggling = togglingId === s._id;

          return (
            <div
              key={s._id}
              className="flex items-center justify-between gap-2.5 p-2.5 rounded-2xl bg-[#f8f9fb] border border-[#e5e8ec] hover:border-[#cbd5e1] transition-all group"
            >
              <div
                onClick={() => !isToggling && handleToggle(s)}
                className="flex items-center gap-2.5 flex-1 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    s.isCompleted
                      ? 'bg-[#0d0f14] border-[#0d0f14] text-[#e6fd53]'
                      : 'border-[#cbd5e1] hover:border-[#0d0f14] bg-white'
                  }`}
                >
                  {isToggling ? (
                    <Loader2 className="w-3 h-3 animate-spin text-[#64748b]" />
                  ) : s.isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : null}
                </div>
                <span
                  className={`text-xs font-medium transition-all ${
                    s.isCompleted
                      ? 'line-through text-[#9ca3af]'
                      : 'text-[#0e1116] group-hover:text-black'
                  }`}
                >
                  {s.title}
                </span>
              </div>

              {canManageSubtasks && (
                <button
                  type="button"
                  onClick={() => handleDeleteSubtask(s._id)}
                  className="text-[#9ca3af] hover:text-rose-600 hover:bg-rose-50 p-1 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Subtask input */}
      {canManageSubtasks && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Add a new subtask..."
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              if (onDraftSubtaskChange) onDraftSubtaskChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handleAddSubtask(e);
              }
            }}
            disabled={adding}
            className="flex-1 rounded-2xl bg-white border border-[#e5e8ec] text-[#0e1116] placeholder:text-[#9ca3af] text-xs py-2 px-3.5 focus:outline-none focus:ring-2 focus:border-[#0d0f14] focus:ring-black/5 transition-all"
          />
          <button
            type="button"
            onClick={handleAddSubtask}
            disabled={adding || !newTitle.trim()}
            className="px-3.5 py-2 bg-[#0d0f14] hover:bg-[#1a1d24] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 select-none shadow-xs cursor-pointer active:scale-95"
          >
            {adding ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>Add</span>
          </button>
        </div>
      )}
    </div>
  );
};
