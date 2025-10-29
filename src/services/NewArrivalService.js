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
