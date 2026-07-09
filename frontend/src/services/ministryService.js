import api from './api';

const ministryService = {
  getSettings: () => api.get('/ministry'),
  updateSettings: (data) => api.put('/ministry', data),
};

export default ministryService;
