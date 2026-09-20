import React, { useState } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Input } from '../common/Input.jsx';
import { Button } from '../common/Button.jsx';
import { projectService } from '../../services/project.service.js';
import { useToast } from '../../hooks/useToast.js';
import { FolderPlus } from 'lucide-react';

export const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { success, error: toastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await projectService.createProject({
        name: name.trim(),
        description: description.trim(),
      });
      success('Project created successfully!');
      setName('');
      setDescription('');
      onProjectCreated(res.data);
      onClose();
    } catch (err) {
      setError(err.message);
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      description="Create a shared workspace to organize tasks, subtasks, and notes."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <Input
          label="Project Name *"
          placeholder="e.g. Website Redesign"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          disabled={loading}
          autoFocus
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Description
          </label>
          <textarea
            placeholder="Brief overview of project goals and scope..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full rounded-xl bg-slate-900/70 border border-slate-800 text-slate-100 text-sm placeholder:text-slate-500 p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={FolderPlus}
            loading={loading}
          >
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};
