import api from '../config/axios';

api.defaults.withCredentials = true;

export const getPaymentMethods = async () => {
  try {
    const response = await api.get('/order/payment-method');
    return response;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};