import api from '../config/axios';

api.defaults.withCredentials = true;

export const addToCart = async (productVariantId , quantity) => {
  const res = await api.post(`/cart/${productVariantId}`,{quantity});
  return res.data;
};