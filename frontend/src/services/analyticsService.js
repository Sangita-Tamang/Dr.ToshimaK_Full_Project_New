import api from './api';

const analyticsService = {
  getSummary: () => api.get('/analytics'),
};

export default analyticsService;
