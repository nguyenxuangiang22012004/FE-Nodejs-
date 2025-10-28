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