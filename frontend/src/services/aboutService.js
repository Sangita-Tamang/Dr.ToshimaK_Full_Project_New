import api from './api';

const aboutService = {
  getSettings: () => api.get('/about'),
  updateSettings: (data) => api.put('/about', data),
};

export default aboutService;
