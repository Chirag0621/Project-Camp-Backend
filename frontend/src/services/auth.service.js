import api from './api.js';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/current-user'),
  changePassword: (data) => api.post('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (resetToken, data) => api.post(`/auth/reset-password/${resetToken}`, data),
  verifyEmail: (verificationToken) => api.get(`/auth/verify-email/${verificationToken}`),
  resendVerificationEmail: () => api.post('/auth/resend-email-verification'),
  googleAuth: (data) => api.post('/auth/google', data),
};
