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
    const proj = item.project || item;
    const name = proj?.name || '';
    const desc = proj?.description || '';
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
  });

  const totalProjects = filteredProjects.length;
  const adminProjects = projectsData.filter((p) => {
    const role = (p.role || p.project?.role || '').toLowerCase();
    return role === UserRolesEnum.ADMIN;
  }).length;
  const memberProjects = projectsData.filter((p) => {
    const role = (p.role || p.project?.role || '').toLowerCase();
    return role === UserRolesEnum.MEMBER;
  }).length;

  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: totalProjects },
    { id: 'admin', label: 'Admin (Owned)', count: adminProjects },
    { id: 'member', label: 'Collaborations', count: memberProjects },
  ];

  const displayedProjects = filteredProjects.filter((p) => {
    if (activeFilter === 'all') return true;
    const role = (p.role || p.project?.role || '').toLowerCase();
    if (activeFilter === 'admin') return role === UserRolesEnum.ADMIN;
    if (activeFilter === 'member') return role === UserRolesEnum.MEMBER;
    return true;
  });

  return (
    <div className="flex flex-col gap-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Neo-Bento Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1116] tracking-tight leading-[1.15]">
            Managing{' '}
            <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#e5e8ec] shadow-sm text-sm align-middle mx-1">
              ⚙️
            </span>{' '}
            Your Team <br className="hidden sm:inline" />
            and{' '}
            <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#e6fd53] border border-[#d4ed34] shadow-sm text-sm align-middle mx-1">
              ✨
            </span>{' '}
            Workflows
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] mt-2 max-w-xl">
            Monitor sprints, manage tasks with subtasks, and organize team collaboration with role-based access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={FolderPlus}
            onClick={() => setCreateModalOpen(true)}
            className="shadow-md shadow-black/10"
          >
            Create a New Project
          </Button>
        </div>
      </div>

      {/* Horizontal Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all select-none flex items-center gap-2 ${
              activeFilter === tab.id
                ? 'bg-[#0d0f14] text-white shadow-sm'
                : 'bg-white hover:bg-[#f1f3f6] text-[#4b5563] border border-[#e5e8ec]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-[#f1f3f6] text-[#64748b]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Neo-Bento Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1: White Bento */}
        <div className="bento-card p-6 rounded-3xl border border-[#e5e8ec] bg-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#f1f3f6] border border-[#e5e8ec] flex items-center justify-center text-[#0e1116]">
                <FolderKanban className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0e1116] tracking-tight">Active Projects</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f1f3f6] text-[#0e1116] border border-[#e5e8ec]">
              100% ⃝
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-[#0e1116] tracking-tight">{totalProjects}</span>
              <span className="text-xs text-[#9ca3af] font-medium">/ 100 max</span>
            </div>

            {/* Capsule Indicators */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-2.5 rounded-full ${
                    i < Math.min(totalProjects, 8)
                      ? 'bg-[#0d0f14]'
                      : 'border border-dashed border-[#d1d5db]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Electric Lime Bento */}
        <div className="bento-lime p-6 rounded-3xl border border-[#d4ed34] bg-[#e6fd53] text-[#0d0f14] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#0d0f14] text-[#e6fd53] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0d0f14] tracking-tight">Admin Ownership</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#0d0f14] text-[#e6fd53]">
              {totalProjects > 0 ? Math.round((adminProjects / totalProjects) * 100) : 0}% ⃝
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-[#0d0f14] tracking-tight">{adminProjects}</span>
              <span className="text-xs text-[#0d0f14]/60 font-semibold">/ {totalProjects} total</span>
            </div>

            {/* Capsule Indicators */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-2.5 rounded-full ${
                    i < Math.min(adminProjects, 8)
                      ? 'bg-[#0d0f14]'
                      : 'border border-dashed border-[#0d0f14]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Deep Obsidian Bento */}
        <div className="bento-dark p-6 rounded-3xl border border-[#1c202a] bg-[#0d0f14] text-white flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#1c202a] text-[#e6fd53] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-tight">Team Collaborations</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#e6fd53]" />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-white tracking-tight">{memberProjects}</span>
              <span className="text-xs text-[#8691a7] font-medium">shared with you</span>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-2.5 rounded-full ${
                    i < Math.min(memberProjects, 8)
                      ? 'bg-[#e6fd53]'
                      : 'border border-dashed border-[#2a303e]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-[#0e1116] tracking-tight flex items-center gap-2.5 w-full sm:w-auto">
            <span>Your Workspaces</span>
            <span className="text-xs font-bold text-[#0e1116] px-2.5 py-0.5 rounded-full bg-white border border-[#e5e8ec]">
              {displayedProjects.length}
            </span>
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by project name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-white border border-[#e5e8ec] text-[#0e1116] text-xs pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:border-[#0d0f14] focus:ring-[#0d0f14]/10 transition-all placeholder:text-[#9ca3af]"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Spinner size="lg" text="Loading your projects..." />
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="bento-card bg-white rounded-3xl p-12 border border-[#e5e8ec] text-center flex flex-col items-center justify-center my-4">
            <div className="w-16 h-16 rounded-2xl bg-[#f1f3f6] border border-[#e5e8ec] text-[#0e1116] flex items-center justify-center mb-4">
              <FolderKanban className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0e1116] mb-1">
              {searchQuery ? 'No matching projects found' : 'No projects yet'}
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm mb-6 leading-relaxed">
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
            {displayedProjects.map((item, idx) => {
              const proj = item.project || item;
              return (
                <ProjectCard
                  key={proj?._id || idx}
                  projectData={item}
                />
              );
            })}
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
