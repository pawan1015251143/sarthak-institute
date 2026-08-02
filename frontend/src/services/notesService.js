import api from './api';

export const notesService = {
  getNotes: async (filters) => {
    try {
      const res = await api.get('/notes', { params: filters });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  uploadNote: async (formData) => {
    try {
      const res = await api.post('/notes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
