import api from './api';

const parliamentService = {
  getSettings: () => api.get('/parliament'),
  updateSettings: (data) => api.put('/parliament', data),
};

export default parliamentService;
