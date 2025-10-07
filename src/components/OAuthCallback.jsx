import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookieRow = cookies.find(row => row.startsWith(name + '='));
  if (cookieRow) {
    return cookieRow.split('=')[1];
  }
  return null; // Cookie not found
};

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Remove #_=_ from URL if present
        if (window.location.hash === '#_=_') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Read 'authToken' from cookie
        const token = getCookie('authToken');

        if (!token) {
          throw new Error('Không tìm thấy token trong cookie');
        }

        // Store token in localStorage to align with AuthService.js
        localStorage.setItem('token', token);

        // Redirect to homepage with reload to fix slider
        navigate('/?reload=true');
      } catch (err) {
        console.error('💥 Error in OAuthCallback:', err.message);
        console.error('🔍 Error details:', {
          message: err.message,
          stack: err.stack,
        });
        navigate('/login', { state: { error: err.message || 'Đăng nhập thất bại' } });
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuthCallback;