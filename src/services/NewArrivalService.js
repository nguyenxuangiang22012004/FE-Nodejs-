import api from '../config/axios';

api.defaults.withCredentials = true;

export const getAllCategories = async () => {
  try {
    const response = await api.get("/new-arrivals/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/new-arrivals/products"); 
    return response.data.data; 
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw error;
  }
};