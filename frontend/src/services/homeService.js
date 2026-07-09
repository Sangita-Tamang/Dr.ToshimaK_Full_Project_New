import api from './api';

const homeService = {
  getSettings: () => api.get('/home'),
  updateSettings: (data) => api.put('/home', data),
};

export default homeService;
