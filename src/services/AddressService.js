import api from '../config/axios';

api.defaults.withCredentials = true;

export const getUserAddresses = async () => {
  try {
    const response = await api.get("/address"); 
    return response;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API getUserAddresses:", error);
    throw error.response?.data || error;
  }
};

export const addUserAddress = async (addressData) => {
  try {
    const response = await api.post("/address", addressData);
    return response;
  } catch (error) {
    console.error("❌ Lỗi khi thêm địa chỉ:", error);
    throw error.response?.data || error;
  }
};

export const getUserAddressById = async (id) => {
  const res = await api.get(`/address/${id}`);
  return res;
};