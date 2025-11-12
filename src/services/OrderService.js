import api from '../config/axios';

api.defaults.withCredentials = true;

export const getMyOrders = async ({ page = 1, limit = 5, status = '' }) => {
  try {
    const response = await api.get("/order", {
      params: { page, limit, status },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getProductVariantById = async (id) => {
  const res = await api.get(`/order/product-variant/${id}`);
  if (res.success) {
    return res;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const cancelOrder = async (orderId , note) => {
  const response = await api.patch(`/order/${orderId}`,{ note });
  return response.data;
};