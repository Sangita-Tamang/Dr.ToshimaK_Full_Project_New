import api from './api';

const mediaService = {
  getAll: (params = {}) => api.get('/media', { params }),
  getById: (id) => api.get(`/media/${id}`),
  create: (data) => api.post('/media', data),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
};

export default mediaService;
