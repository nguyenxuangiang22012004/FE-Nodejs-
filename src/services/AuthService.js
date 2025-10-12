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
    const response = await api.post('/auth/login', { email, password }, { withCredentials: true });

    const data = response.data || response;
 
    const user = data.user || data; 

    if (!user || typeof user !== 'object') {
      throw new Error('API response does not contain valid user');
    }

    console.log('✅ Đăng nhập thành công:', user);

    // Lưu user vào localStorage
    localStorage.setItem('user', JSON.stringify(user));
     window.dispatchEvent(new Event('auth-changed'));

    return user;
  } catch (error) {
    console.error('💥 API Error in AuthService:', error.message);
    throw new Error(error.response?.data?.message || error.message || 'Lỗi không xác định khi đăng nhập');
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

/**
 * Kiểm tra trạng thái đăng nhập (bằng cookie)
 */
export const checkAuth = async () => {
  try {
    const res = await api.get('/auth/me', { withCredentials: true });
    if (res.data?.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.user;
    }
    return null;
  } catch (err) {
    console.warn('⚠️ User chưa đăng nhập:', err.message);
    localStorage.removeItem('user');
    return null;
  }
};

/**
 * Lấy thông tin user hiện tại từ localStorage
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    console.error('❌ Lỗi khi đọc user từ localStorage:', err);
    return null;
  }
};
