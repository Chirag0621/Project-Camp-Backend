import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = error.response?.data;
    let message = 'An error occurred. Please try again.';

    if (errorData) {
      if (errorData.message) {
        message = errorData.message;
      }
      if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        const firstErr = errorData.errors[0];
        const key = Object.keys(firstErr)[0];
        if (key && firstErr[key]) {
          message = `${firstErr[key]}`;
        }
      }
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
