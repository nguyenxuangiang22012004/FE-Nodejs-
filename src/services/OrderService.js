import api from '../config/axios';

api.defaults.withCredentials = true;

export const getMyOrders = async ({ page = 1, limit = 5, status  = '' }) => {
  try {
    const response = await api.get("/order", {
      params: { page, limit, status  },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getProductVariantById = async (id) => {
  const res =  await api.get(`/order/product-variant/${id}`);
  if(res.success){
    return res;
  }
};