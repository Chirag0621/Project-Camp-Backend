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
}) => {
  const [newTitle, setNewTitle] = useState('');
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
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setAdding(true);
      await taskService.createSubTask(projectId, taskId, {
        title: newTitle.trim(),
      });
      success('Subtask added!');
      setNewTitle('');
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
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span className="uppercase tracking-wider">
          Subtasks ({completedCount}/{subtasks.length})
        </span>
        <span className="text-indigo-400 font-bold">{percentage}%</span>
      </div>

      {subtasks.length > 0 && (
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
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
              className="flex items-center justify-between gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all group"
            >
              <div
                onClick={() => !isToggling && handleToggle(s)}
                className="flex items-center gap-2.5 flex-1 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    s.isCompleted
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'border-slate-700 hover:border-slate-500 bg-slate-950'
                  }`}
                >
                  {isToggling ? (
                    <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                  ) : s.isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : null}
                </div>
                <span
                  className={`text-xs transition-all ${
                    s.isCompleted
                      ? 'line-through text-slate-500'
                      : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  {s.title}
                </span>
              </div>

              {canManageSubtasks && (
                <button
                  type="button"
                  onClick={() => handleDeleteSubtask(s._id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100"
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
        <form onSubmit={handleAddSubtask} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Add a new subtask..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={adding}
            className="flex-1 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs py-2 px-3 focus:outline-none focus:ring-1 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={adding || !newTitle.trim()}
            className="px-3 py-2 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-50"
          >
            {adding ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>Add</span>
          </button>
        </form>
      )}
    </div>
  );
};
