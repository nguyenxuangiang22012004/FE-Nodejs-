import api from '../config/axios';

api.defaults.withCredentials = true;

export const addToCart = async (productVariantId , quantity) => {
  const res = await api.post(`/cart/${productVariantId}`,{quantity});
  return res.data;
};

export const getCart = async () => {
  const res = await api.get('/cart');
  return res.data;
};

export const updateCart = async (cartItems) => {
  try {
    const responses = await Promise.all(
      cartItems.map(async (item) => {
        const payload = {
          quantity: item.quantity,
          unitPrice: item.price,
        };

        const res = await api.patch(`/cart/${item.productVariantId}`, payload);
        return res.data;
      })
    );

    return responses; 
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};