import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Input } from '../common/Input.jsx';
import { Button } from '../common/Button.jsx';
import { SubtaskList } from './SubtaskList.jsx';
import { taskService } from '../../services/task.service.js';
import { useToast } from '../../hooks/useToast.js';
import {
  TaskStatusEnum,
  TASK_STATUS_CONFIG,
  UserRolesEnum,
} from '../../utils/constants.js';
import { formatFileSize } from '../../utils/formatters.js';
import {
  Paperclip,
  Trash2,
  Save,
  Plus,
  ExternalLink,
  FileText,
} from 'lucide-react';

export const TaskModal = ({
  isOpen,
  onClose,
  projectId,
  taskId,
  initialStatus = TaskStatusEnum.TODO,
  members = [],
  currentUserRole,
  onTaskUpdated,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(initialStatus);
  const [assignedTo, setAssignedTo] = useState('');
  const [files, setFiles] = useState([]);
  const [existingAttachments, setExistingAttachments] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [draftSubtask, setDraftSubtask] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  const isEdit = !!taskId;
  const canEdit =
    currentUserRole === UserRolesEnum.ADMIN ||
    currentUserRole === UserRolesEnum.PROJECT_ADMIN;

  const fetchTaskDetails = async () => {
    if (!taskId) return;
    try {
      setLoading(true);
      const res = await taskService.getTaskById(projectId, taskId);
      const t = res.data;
      setTitle(t.title || '');
      setDescription(t.description || '');
      setStatus(t.status || TaskStatusEnum.TODO);
      setAssignedTo(t.assignedTo?._id || '');
      setExistingAttachments(t.attachments || []);
      setSubtasks(t.subtasks || []);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setDraftSubtask('');
      if (taskId) {
        fetchTaskDetails();
      } else {
        setTitle('');
        setDescription('');
        setStatus(initialStatus);
        setAssignedTo('');
        setFiles([]);
        setExistingAttachments([]);
        setSubtasks([]);
      }
    }
  }, [isOpen, taskId, initialStatus]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      error('Task title is required');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('status', status);
      if (assignedTo) {
        formData.append('assignedTo', assignedTo);
      }
      files.forEach((file) => {
        formData.append('attachments', file);
      });

      let savedTaskId = taskId;
      if (isEdit) {
        await taskService.updateTask(projectId, taskId, formData);
      } else {
        const createRes = await taskService.createTask(projectId, formData);
        savedTaskId = createRes.data?._id;
      }

      // If user typed a subtask and clicked Save Changes, auto-create it
      if (draftSubtask && draftSubtask.trim() && savedTaskId) {
        try {
          await taskService.createSubTask(projectId, savedTaskId, {
            title: draftSubtask.trim(),
          });
        } catch {
          // Task itself was updated successfully
        }
      }

      success(isEdit ? 'Task updated successfully!' : 'Task created successfully!');
      onTaskUpdated();
      onClose();
    } catch (err) {
      error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setSaving(true);
      await taskService.deleteTask(projectId, taskId);
      success('Task deleted successfully!');
      onTaskUpdated();
      onClose();
    } catch (err) {
      error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? (canEdit ? 'Edit Task' : 'Task Details') : 'Create New Task'}
      description={
        isEdit
          ? 'View and manage task progress, subtasks, and files.'
          : 'Add a new task to your project board.'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <Input
          label="Task Title *"
          placeholder="e.g. Design wireframes for onboarding"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canEdit || saving}
          autoFocus={!isEdit}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0e1116] tracking-tight">
            Description
          </label>
          <textarea
            placeholder="Add context, acceptance criteria, or instructions..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!canEdit || saving}
            className="w-full rounded-2xl bg-[#f8fafc] border border-[#e5e8ec] text-[#0e1116] text-sm placeholder:text-[#9ca3af] p-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:border-[#0d0f14] focus:ring-black/5 resize-none disabled:opacity-60 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0e1116] tracking-tight">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!canEdit || saving}
              className="w-full rounded-2xl bg-[#f8fafc] border border-[#e5e8ec] text-[#0e1116] text-sm py-2.5 px-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:border-[#0d0f14] focus:ring-black/5 disabled:opacity-60 transition-all"
            >
              {Object.entries(TASK_STATUS_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0e1116] tracking-tight">
              Assignee
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              disabled={!canEdit || saving}
              className="w-full rounded-2xl bg-[#f8fafc] border border-[#e5e8ec] text-[#0e1116] text-sm py-2.5 px-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:border-[#0d0f14] focus:ring-black/5 disabled:opacity-60 transition-all"
            >
              <option value="">Unassigned</option>
              {members.map((m) => {
                const u = m.user || {};
                return (
                  <option key={u._id} value={u._id}>
                    {u.fullName || u._username} ({m.role})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Existing Attachments */}
        {existingAttachments.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f0f2f5]">
            <label className="text-xs font-semibold text-[#0e1116] tracking-tight">
              Attachments ({existingAttachments.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {existingAttachments.map((att, idx) => (
                <a
                  key={idx}
                  href={att.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-[#e5e8ec] hover:border-[#0d0f14] text-xs text-[#0e1116] transition-all group shadow-xs"
                >
                  <FileText className="w-4 h-4 text-[#64748b] group-hover:text-[#0d0f14]" />
                  <span className="truncate max-w-[140px] font-medium">
                    {att.url.split('/').pop()}
                  </span>
                  <span className="text-[10px] text-[#9ca3af]">
                    ({formatFileSize(att.size)})
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#9ca3af]" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* File Attachments Upload Input */}
        {canEdit && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f0f2f5]">
            <label className="text-xs font-semibold text-[#0e1116] tracking-tight flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Upload Attachments</span>
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={saving}
              className="text-xs text-[#64748b] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#f1f3f6] file:text-[#0e1116] hover:file:bg-[#e5e8ec] file:cursor-pointer transition-all"
            />
          </div>
        )}

        {/* Subtasks checklist */}
        {isEdit && (
          <div className="pt-3 border-t border-[#f0f2f5]">
            <SubtaskList
              projectId={projectId}
              taskId={taskId}
              subtasks={subtasks}
              onSubtasksUpdated={fetchTaskDetails}
              canManageSubtasks={canEdit}
              draftTitle={draftSubtask}
              onDraftSubtaskChange={setDraftSubtask}
            />
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#f0f2f5]">
          <div>
            {isEdit && canEdit && (
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={handleDeleteTask}
                disabled={saving}
              >
                Delete Task
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClose} disabled={saving}>
              {canEdit ? 'Cancel' : 'Close'}
            </Button>
            {canEdit && (
              <Button
                type="submit"
                variant="primary"
                icon={isEdit ? Save : Plus}
                loading={saving}
              >
                {isEdit ? 'Save Changes' : 'Create Task'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
