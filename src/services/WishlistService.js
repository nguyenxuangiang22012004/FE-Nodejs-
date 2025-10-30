import api from '../config/axios';

api.defaults.withCredentials = true;

export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (productVariantId) => {
  const res = await api.post(`/wishlist/${productVariantId}`);
  return res.data;
};