import api from './api.js';

export const taskService = {
  getTasks: (projectId) => api.get(`/tasks/${projectId}`),
  createTask: (projectId, formData) =>
    api.post(`/tasks/${projectId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getTaskById: (projectId, taskId) => api.get(`/tasks/${projectId}/t/${taskId}`),
  updateTask: (projectId, taskId, formDataOrData) => {
    const isFormData = formDataOrData instanceof FormData;
    return api.put(
      `/tasks/${projectId}/t/${taskId}`,
      formDataOrData,
      isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
    );
  },
  deleteTask: (projectId, taskId) => api.delete(`/tasks/${projectId}/t/${taskId}`),
  createSubTask: (projectId, taskId, data) =>
    api.post(`/tasks/${projectId}/t/${taskId}/subtasks`, data),
  updateSubTask: (projectId, subTaskId, data) =>
    api.put(`/tasks/${projectId}/st/${subTaskId}`, data),
  deleteSubTask: (projectId, subTaskId) =>
    api.delete(`/tasks/${projectId}/st/${subTaskId}`),
};
