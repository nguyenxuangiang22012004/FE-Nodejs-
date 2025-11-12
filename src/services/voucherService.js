// src/services/voucherService.js
import api from '../config/axios';

api.defaults.withCredentials = true;

// 🏷️ Lấy danh sách tất cả voucher
export const getAllVouchers = async () => {
  try {
    const response = await api.get("/coupon");
    return response.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error.response?.data || error.message;
  }
};

// 🎟️ Nhận (claim) một voucher theo ID
export const claimVoucher = async (voucherId) => {
  try {
    const response = await api.post(`/coupon/${voucherId}`);
    return response.data;
  } catch (error) {
    console.error("Error claiming voucher:", error);
    throw error.response?.data || error.message;
  }
};

// 👛 Lấy danh sách voucher mà user đã nhận
export const getMyVouchers = async () => {
  try {
    const response = await api.get("/vouchers/my-vouchers");
    return response.data;
  } catch (error) {
    console.error("Error fetching user's vouchers:", error);
    throw error.response?.data || error.message;
  }
};
