import api from '../config/axios';

api.defaults.withCredentials = true;

export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (productId) => {
  const res = await api.post(`/wishlist/${productId}`);
  return res.data;
};

export const removeFromWishlist  = async (productVariantId) => {
  try {
    const res = await api.delete(`/cart/${productVariantId}`);
    return res;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};