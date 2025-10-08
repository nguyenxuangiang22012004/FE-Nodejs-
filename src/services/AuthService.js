import api from '../config/axios'; // Import instance Axios đã cấu hình

export const login = async (email, password) => {
  try {

    const response = await api.post('/auth/login', {
      email,
      password,
    });


    // Kiểm tra response có hợp lệ không
    if (!response || typeof response !== 'object') {
      throw new Error('API response is invalid or empty');
    }

    // Kiểm tra success và dữ liệu user, token
    if (!response.success || !response.data?.user || !response.data?.token) {
      throw new Error('API response does not contain valid user or token');
    }

    // Lưu token vào localStorage
    localStorage.setItem('token', response.data.token);

    return response;

  } catch (error) {
    console.error('💥 API Error in AuthService:', error.message);
    console.error('🔍 Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack,
    });

    throw new Error(error.response?.data?.message || error.message || 'Lỗi không xác định khi đăng nhập');
  }
};

export const loginWithGoogle = async () => {
  try {
    console.log('📡 AuthService.loginWithGoogle() called');
    // Chuyển hướng đến endpoint Google OAuth
    window.location.href = 'http://localhost:3000/auth/google';
  } catch (error) {
    console.error('💥 Error in AuthService.loginWithGoogle:', error.message);
    console.error('🔍 Error details:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Không thể khởi tạo đăng nhập Google');
  }
};


export const loginWithFacebook = async () => {
  try {
    console.log('📡 AuthService.loginWithFacebook() called');
    window.location.href = 'http://localhost:3000/auth/facebook';
  } catch (error) {
    console.error('💥 Error in AuthService.loginWithFacebook:', error.message);
    console.error('🔍 Error details:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Không thể khởi tạo đăng nhập Facebook');
  }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}