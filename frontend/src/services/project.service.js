import api from './api.js';

export const projectService = {
  getProjects: () => api.get('/projects'),
  createProject: (data) => api.post('/projects', data),
  getProjectById: (projectId) => api.get(`/projects/${projectId}`),
  updateProject: (projectId, data) => api.put(`/projects/${projectId}`, data),
  deleteProject: (projectId) => api.delete(`/projects/${projectId}`),
  getProjectMembers: (projectId) => api.get(`/projects/${projectId}/members`),
  addMemberToProject: (projectId, data) => api.post(`/projects/${projectId}/members`, data),
  updateMemberRole: (projectId, userId, newRole) =>
    api.put(`/projects/${projectId}/members/${userId}`, { newRole }),
  deleteMember: (projectId, userId) =>
    api.delete(`/projects/${projectId}/members/${userId}`),
};
