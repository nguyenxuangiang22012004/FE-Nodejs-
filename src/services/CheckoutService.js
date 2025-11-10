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


export const getCoupons = async () => {
  try {
    const response = await api.get('/order/voucher');
    return response.data; 
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return [];
  }
};