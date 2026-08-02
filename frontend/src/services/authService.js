import api from './api';

export const authService = {
  login: async (studentId, password) => {
    try {
      const res = await api.post('/auth/login', { studentId, password });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  adminLogin: async (email, password) => {
    try {
      const res = await api.post('/auth/admin-login', { email, password });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getProfile: async () => {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
