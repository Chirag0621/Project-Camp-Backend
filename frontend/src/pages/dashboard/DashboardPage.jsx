import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/project.service.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useToast } from '../../hooks/useToast.js';
import { ProjectCard } from '../../components/projects/ProjectCard.jsx';
import { CreateProjectModal } from '../../components/projects/CreateProjectModal.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Spinner } from '../../components/common/Spinner.jsx';
import {
  FolderPlus,
  Search,
  FolderKanban,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react';
import { UserRolesEnum } from '../../utils/constants.js';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { error } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjects();
      setProjectsData(res.data || []);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projectsData.filter((item) => {
    const name = item.project?.name || '';
    const desc = item.project?.description || '';
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
  });

  const totalProjects = projectsData.length;
  const adminProjects = projectsData.filter((p) => p.role === UserRolesEnum.ADMIN).length;
  const memberProjects = projectsData.filter((p) => p.role === UserRolesEnum.MEMBER).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workspace Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Welcome back, {user?.fullName || user?.username}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor and access all your active team projects and ongoing sprints.
          </p>
        </div>

        <Button
          variant="primary"
          icon={FolderPlus}
          onClick={() => setCreateModalOpen(true)}
          className="shadow-xl shadow-indigo-600/25"
        >
          New Project
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Projects
            </p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              {totalProjects}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-600/15 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Admin Projects
            </p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              {adminProjects}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Collaborations
            </p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              {memberProjects}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 w-full sm:w-auto">
            <span>Your Projects</span>
            <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
              {filteredProjects.length}
            </span>
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Spinner size="lg" text="Loading your projects..." />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 border border-slate-800 text-center flex flex-col items-center justify-center my-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <FolderKanban className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-1">
              {searchQuery ? 'No matching projects found' : 'No projects yet'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
              {searchQuery
                ? 'Try adjusting your search criteria or clear the filter.'
                : 'Create your first project to start organizing tasks, assigning team members, and collaborating.'}
            </p>
            {!searchQuery && (
              <Button
                variant="primary"
                icon={FolderPlus}
                onClick={() => setCreateModalOpen(true)}
              >
                Create First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((item) => (
              <ProjectCard
                key={item.project?._id || Math.random()}
                projectData={item}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onProjectCreated={fetchProjects}
      />
    </div>
  );
};
