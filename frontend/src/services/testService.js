import api from './api';

export const testService = {
  getTests: async (classLevel) => {
    try {
      const res = await api.get('/tests', { params: { classLevel } });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  submitTestAttempt: async (testId, attemptData) => {
    try {
      const res = await api.post(`/tests/${testId}/submit`, attemptData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
