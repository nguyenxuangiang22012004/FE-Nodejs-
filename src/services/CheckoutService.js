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

export const createCheckoutOrder = async (data) => {
  try {
    const res = await api.post("order/checkout", data);
    return res;
  } catch (error) {
    console.error("❌ Lỗi khi tạo đơn hàng:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};