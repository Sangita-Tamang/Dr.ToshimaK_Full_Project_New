import api from './api';

const partyService = {
  getSettings: () => api.get('/party'),
  updateSettings: (data) => api.put('/party', data)
};

export default partyService;
