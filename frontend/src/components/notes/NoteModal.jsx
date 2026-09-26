import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Button } from '../common/Button.jsx';
import { noteService } from '../../services/note.service.js';
import { useToast } from '../../hooks/useToast.js';
import { FileText, Save, Plus } from 'lucide-react';

export const NoteModal = ({
  isOpen,
  onClose,
  projectId,
  note = null,
  onNoteSaved,
}) => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  const isEdit = !!note;

  useEffect(() => {
    if (isOpen) {
      setContent(note ? note.content : '');
    }
  }, [isOpen, note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      error('Note content cannot be empty');
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await noteService.updateNote(projectId, note._id, {
          content: content.trim(),
        });
        success('Note updated successfully!');
      } else {
        await noteService.createNote(projectId, {
          content: content.trim(),
        });
        success('Note created successfully!');
      }

      onNoteSaved();
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
      title={isEdit ? 'Edit Project Note' : 'Add Project Note'}
      description="Document key requirements, meetings, or architectural updates."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0e1116] tracking-tight">
            Note Content *
          </label>
          <textarea
            placeholder="Write project notes, guidelines, or summaries..."
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={saving}
            autoFocus
            className="w-full rounded-2xl bg-[#f8fafc] border border-[#e5e8ec] text-[#0e1116] text-sm placeholder:text-[#9ca3af] p-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:border-[#0d0f14] focus:ring-black/5 resize-none transition-all"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f0f2f5]">
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={isEdit ? Save : Plus}
            loading={saving}
          >
            {isEdit ? 'Save Changes' : 'Create Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
