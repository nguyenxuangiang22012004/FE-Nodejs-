import api from '../config/axios';

// 🔥 Mặc định mọi request gửi cookie đi
api.defaults.withCredentials = true;

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData, { withCredentials: true });
    const data = response.data || response;

    const user = data.user || data;

    if (!user || typeof user !== 'object') {
      throw new Error('API response does not contain valid user');
    }

    localStorage.setItem('user', JSON.stringify(user));
    window.dispatchEvent(new Event('auth-changed'));

    return user;
  } catch (error) {
    console.error('💥 API Error in register:', error.message);
    throw new Error(error.response?.data?.message || 'Lỗi không xác định khi đăng ký');
  }
};


export const login = async (email, password) => {
  try {
    // 1️⃣ Gửi login request
     await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true } // cookie sẽ được lưu bởi browser
    )

    // 2️⃣ Sau khi login, gọi /auth/me để lấy thông tin user
    const meResponse = await api.get("/me", { withCredentials: true });
    const user = meResponse.data?.data || meResponse.data;

    if (!user || typeof user !== "object") {
      throw new Error("Không thể lấy thông tin người dùng sau khi đăng nhập");
    }

    console.log("✅ Đăng nhập thành công:", user);

    // 3️⃣ Lưu user vào localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // 4️⃣ Gửi sự kiện cập nhật auth toàn app
    window.dispatchEvent(new Event("auth-changed"));

    return user;
  } catch (error) {
    console.error("💥 API Error in AuthService:", error);

    // 5️⃣ Xử lý lỗi thân thiện
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Lỗi không xác định khi đăng nhập"
    );
  }
};

/**
 * Đăng nhập Google OAuth
 */
export const loginWithGoogle = () => {
  try {
    console.log('📡 Chuyển hướng đến Google OAuth...');
    const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
    window.location.href = `${backendUrl}/auth/google`;
  } catch (error) {
    console.error('💥 Error in loginWithGoogle:', error.message);
    throw new Error('Không thể khởi tạo đăng nhập Google');
  }
};


/**
 * Đăng nhập Facebook OAuth
 */
export const loginWithFacebook = () => {
  try {
    console.log('📡 Chuyển hướng đến Facebook OAuth...');
    const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
    window.location.href = `${backendUrl}/auth/facebook`;
  } catch (error) {
    console.error('💥 Error in loginWithFacebook:', error.message);
    throw new Error('Không thể khởi tạo đăng nhập Facebook');
  }
};

/**
 * Đăng xuất — backend xóa cookie
 */
export const logout = async () => {
  console.log('🚪 Đăng xuất...');
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (err) {
    console.warn('⚠️ Lỗi khi gọi API logout:', err.message);
  }

  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth-changed'));
};

export const requestPasswordReset = async (email) => {
  try {
    const res = await api.post("/auth/send-reset-password", { email });
    return res.data; 
  } catch (error) {
    console.error("💥 Error in requestPasswordReset:", error);
    throw new Error(
      error.response?.data?.message || "Không thể gửi yêu cầu đặt lại mật khẩu"
    );
  }
};

export const resetPassword = async (password) => {
  try {
    const res = await api.patch(
      "/auth/reset-password",
      { password },
      { withCredentials: true } 
    );
    return res.data;
  } catch (error) {
    console.error("❌ Reset password error:", error);
    throw error.response?.data || { message: "Server error" };
  }
};