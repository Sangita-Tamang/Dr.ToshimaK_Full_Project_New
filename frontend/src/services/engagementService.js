import api from './api';

const engagementService = {
  getUpcoming: () => api.get('/engagements/upcoming'),
  getAll: () => api.get('/engagements'),
  create: (data) => api.post('/engagements', data),
  update: (id, data) => api.put(`/engagements/${id}`, data),
  delete: (id) => api.delete(`/engagements/${id}`),
};

export default engagementService;
