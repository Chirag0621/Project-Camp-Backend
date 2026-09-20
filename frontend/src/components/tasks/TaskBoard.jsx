import React, { useState } from 'react';
import { TaskCard } from './TaskCard.jsx';
import { Button } from '../common/Button.jsx';
import {
  TaskStatusEnum,
  TASK_STATUS_CONFIG,
  UserRolesEnum,
} from '../../utils/constants.js';
import { Plus, Search, Filter } from 'lucide-react';

export const TaskBoard = ({
  tasks = [],
  members = [],
  currentUserRole,
  onTaskClick,
  onNewTaskClick,
  onStatusChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const canCreate =
    currentUserRole === UserRolesEnum.ADMIN ||
    currentUserRole === UserRolesEnum.PROJECT_ADMIN;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAssignee =
      assigneeFilter === 'all'
        ? true
        : assigneeFilter === 'unassigned'
        ? !task.assignedTo
        : task.assignedTo?._id === assigneeFilter;

    return matchesSearch && matchesAssignee;
  });

  const columns = [
    { id: TaskStatusEnum.TODO, ...TASK_STATUS_CONFIG[TaskStatusEnum.TODO] },
    { id: TaskStatusEnum.IN_PROGRESS, ...TASK_STATUS_CONFIG[TaskStatusEnum.IN_PROGRESS] },
    { id: TaskStatusEnum.DONE, ...TASK_STATUS_CONFIG[TaskStatusEnum.DONE] },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>

          <div className="relative w-44">
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-indigo-500"
            >
              <option value="all">All Assignees</option>
              <option value="unassigned">Unassigned</option>
              {members.map((m) => {
                const u = m.user || {};
                return (
                  <option key={u._id} value={u._id}>
                    {u.fullName || u._username}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {canCreate && (
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => onNewTaskClick(TaskStatusEnum.TODO)}
            className="w-full sm:w-auto"
          >
            New Task
          </Button>
        )}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`glass-panel rounded-2xl p-4 border border-slate-800/80 border-t-2 ${col.headerColor} flex flex-col gap-3 min-h-[420px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                  <span className="font-semibold text-sm text-slate-200">
                    {col.label}
                  </span>
                  <span className="text-xs font-bold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800/80">
                    {colTasks.length}
                  </span>
                </div>

                {canCreate && (
                  <button
                    onClick={() => onNewTaskClick(col.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    title={`Add task to ${col.label}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Task Cards Column List */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-0.5">
                {colTasks.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-800/60 rounded-xl text-xs text-slate-500 flex flex-col items-center gap-2 my-auto">
                    <span>No tasks in {col.label}</span>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onClick={() => onTaskClick(task._id)}
                      onStatusChange={onStatusChange}
                      canEdit={canCreate}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
