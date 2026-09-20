import api from './api.js';

export const noteService = {
  getNotes: (projectId) => api.get(`/notes/${projectId}`),
  createNote: (projectId, data) => api.post(`/notes/${projectId}`, data),
  getNoteById: (projectId, noteId) => api.get(`/notes/${projectId}/n/${noteId}`),
  updateNote: (projectId, noteId, data) => api.put(`/notes/${projectId}/n/${noteId}`, data),
  deleteNote: (projectId, noteId) => api.delete(`/notes/${projectId}/n/${noteId}`),
};
