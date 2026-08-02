import api from './api';

export const paymentService = {
  getFeeStructure: async () => {
    try {
      const res = await api.get('/fees');
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  submitPayment: async (paymentData) => {
    try {
      const res = await api.post('/payments', paymentData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getPaymentHistory: async (studentId) => {
    try {
      const res = await api.get(`/payments/history?studentId=${studentId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
