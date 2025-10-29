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


export const getAllProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.q) {
      queryParams.append("q", filters.q);
    }

    if (filters.subcategoryId) {
      queryParams.append("id", filters.subcategoryId);
    }

    queryParams.append("limit", filters.limit ?? 12); 
    queryParams.append("offset", filters.offset ?? 0);

    const queryString = queryParams.toString();
    const url = `/new-arrivals/products${queryString ? `?${queryString}` : ""}`;

    const response = await api.get(url);
    
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response format from server");
    }

    return response.data.data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw error;
  }
};
