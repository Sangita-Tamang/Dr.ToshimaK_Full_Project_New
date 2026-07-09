import api from './api';

const contactService = {
  submit: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contact', { params }),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
  submitInterview: (data) => api.post('/interviews', data),
  getInterviews: (params = {}) => api.get('/interviews', { params }),
  updateInterview: (id, data) => api.put(`/interviews/${id}`, data),
};

export default contactService;
