import api from '../config/axios';

api.defaults.withCredentials = true;


export const getUserProfile = async () => {
  try {
    const res = await api.get("/manager-profile/profile",{ withCredentials: true });
    return res; 
  } catch (error) {
    console.error("❌ Fetch user profile failed:", error);
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const res = await api.patch("/manager-profile/profile", data);
    return res.data;
  } catch (error) {
    console.error("Update profile failed:", error);
    throw error.response?.data || error;
  }
};