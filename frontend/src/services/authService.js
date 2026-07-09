import api from './api';

const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  register: (userData) => api.post('/auth/register', userData),
};

export default authService;
