import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../../services/project.service.js';
import { taskService } from '../../services/task.service.js';
import { noteService } from '../../services/note.service.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useToast } from '../../hooks/useToast.js';
import { TaskBoard } from '../../components/tasks/TaskBoard.jsx';
import { TaskModal } from '../../components/tasks/TaskModal.jsx';
import { MembersModal } from '../../components/projects/MembersModal.jsx';
import { NoteCard } from '../../components/notes/NoteCard.jsx';
import { NoteModal } from '../../components/notes/NoteModal.jsx';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Spinner } from '../../components/common/Spinner.jsx';
import {
  UserRolesEnum,
  ROLE_CONFIG,
  TaskStatusEnum,
} from '../../utils/constants.js';
import {
  Users,
  CheckSquare,
  FileText,
  Settings,
  Trash2,
  Plus,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(UserRolesEnum.MEMBER);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'notes'
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [initialTaskStatus, setInitialTaskStatus] = useState(TaskStatusEnum.TODO);

  const [membersModalOpen, setMembersModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProjectData = useCallback(async () => {
    try {
      setLoading(true);
      const [projRes, membersRes, tasksRes, notesRes] = await Promise.all([
        projectService.getProjectById(projectId),
        projectService.getProjectMembers(projectId),
        taskService.getTasks(projectId),
        noteService.getNotes(projectId),
      ]);

      setProject(projRes.data);
      const memberList = membersRes.data || [];
      setMembers(memberList);
      setTasks(tasksRes.data || []);
      setNotes(notesRes.data || []);

      // Derive current user's role in this project
      const myMembership = memberList.find(
        (m) => m.user?._id === user?._id || m.user === user?._id
      );
      if (myMembership) {
        setCurrentUserRole(myMembership.role);
      }
    } catch (err) {
      error(err.message);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [projectId, user?._id, error, navigate]);

  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId, fetchProjectData]);

  const handleOpenNewTask = (status = TaskStatusEnum.TODO) => {
    setSelectedTaskId(null);
    setInitialTaskStatus(status);
    setTaskModalOpen(true);
  };

  const handleOpenTaskDetails = (taskId) => {
    setSelectedTaskId(taskId);
    setTaskModalOpen(true);
  };

  const handleOpenNewNote = () => {
    setSelectedNote(null);
    setNoteModalOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setNoteModalOpen(true);
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await noteService.deleteNote(projectId, noteId);
      success('Note deleted!');
      const notesRes = await noteService.getNotes(projectId);
      setNotes(notesRes.data || []);
    } catch (err) {
      error(err.message);
    }
  };

  const handleDeleteProject = async () => {
    try {
      setDeleting(true);
      await projectService.deleteProject(projectId);
      success('Project deleted successfully!');
      navigate('/dashboard');
    } catch (err) {
      error(err.message);
    } finally {
      setDeleting(false);
      setDeleteConfirmOpen(false);
    }
  };

  const isAdmin = currentUserRole === UserRolesEnum.ADMIN;
  const roleMeta = ROLE_CONFIG[currentUserRole] || {
    label: currentUserRole,
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Spinner size="lg" text="Loading project workspace..." />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Users}
            onClick={() => setMembersModalOpen(true)}
          >
            <span>Team ({members.length})</span>
          </Button>

          {isAdmin && (
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setDeleteConfirmOpen(true)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Project Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {project.name}
            </h1>
            <Badge className={roleMeta.badge}>{roleMeta.label}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            {project.description || 'No description provided for this project.'}
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'tasks'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Tasks ({tasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'notes'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Notes ({notes.length})</span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'tasks' ? (
        <TaskBoard
          tasks={tasks}
          members={members}
          currentUserRole={currentUserRole}
          onTaskClick={handleOpenTaskDetails}
          onNewTaskClick={handleOpenNewTask}
          onStatusChange={fetchProjectData}
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Shared documentation, guidelines, and project specifications.
            </p>
            {isAdmin && (
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={handleOpenNewNote}
              >
                Add Note
              </Button>
            )}
          </div>

          {notes.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center my-6 border border-slate-800">
              <FileText className="w-10 h-10 text-slate-500 mb-3" />
              <h3 className="text-base font-bold text-slate-300">
                No project notes yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {isAdmin
                  ? 'Create notes to share important requirements, architecture notes, or meeting summaries.'
                  : 'Your project administrators have not posted any notes yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  canManage={isAdmin}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        projectId={projectId}
        taskId={selectedTaskId}
        initialStatus={initialTaskStatus}
        members={members}
        currentUserRole={currentUserRole}
        onTaskUpdated={fetchProjectData}
      />

      <MembersModal
        isOpen={membersModalOpen}
        onClose={() => setMembersModalOpen(false)}
        projectId={projectId}
        currentUserRole={currentUserRole}
      />

      <NoteModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        projectId={projectId}
        note={selectedNote}
        onNoteSaved={fetchProjectData}
      />

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${project.name}"? All associated tasks, subtasks, notes, and file attachments will be permanently deleted.`}
        confirmText="Delete Project"
        isDanger={true}
        loading={deleting}
      />
    </div>
  );
};
