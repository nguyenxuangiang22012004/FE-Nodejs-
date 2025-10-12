// src/hooks/useAuthFromCookie.jsx
import { useEffect } from 'react';

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookieRow = cookies.find((row) => row.startsWith(name + '='));
  if (cookieRow) {
    return cookieRow.split('=')[1];
  }
  return null;
};

export const useAuthFromCookie = () => {
  useEffect(() => {
    const processAuthCookie = async () => {
      try {
        const existingToken = localStorage.getItem('token');
        const cookieToken = getCookie('authToken');

        console.log('🔍 Checking auth:', {
          hasLocalStorageToken: !!existingToken,
          hasCookieToken: !!cookieToken,
          cookieToken: cookieToken ? cookieToken.substring(0, 20) + '...' : 'None'
        });

        if (cookieToken && !existingToken) {
          console.log('🔄 Processing OAuth login from cookie...');
          localStorage.setItem('token', cookieToken);
          console.log('✅ Token saved to localStorage');

          try {
            const base64Url = cookieToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const tokenPayload = JSON.parse(window.atob(base64));
            console.log('🔍 Token payload:', tokenPayload);

            const userData = {
              id: tokenPayload.userId || tokenPayload.id || tokenPayload.sub,
              email: tokenPayload.email || '',
              firstName: tokenPayload.firstName || '',
              lastName: tokenPayload.lastName || '',
              name:
                tokenPayload.name ||
                (tokenPayload.firstName && tokenPayload.lastName
                  ? `${tokenPayload.firstName} ${tokenPayload.lastName}`.trim()
                  : tokenPayload.email || 'User'),
              role: tokenPayload.role || 'User',
            };

            localStorage.setItem('user', JSON.stringify(userData));
            console.log('✅ User data saved:', userData);

            // Xóa cookie sau khi xử lý
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            console.log('🗑️ Cookie authToken deleted');
          } catch (error) {
            console.error('❌ Error parsing token:', error);
            await fetchUserFromAPI(cookieToken);
          }
        }
      } catch (error) {
        console.error('❌ Error in processAuthCookie:', error);
      }
    };

    processAuthCookie();
  }, []);

  const fetchUserFromAPI = async (token) => {
    const endpoints = [
      'http://localhost:3000/auth/me',
      'http://localhost:3000/api/auth/me',
      'http://localhost:3000/user/profile',
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ User data from API:', data);

          let userData = null;
          if (data.user) userData = data.user;
          else if (data.data?.user) userData = data.data.user;
          else if (data.id) userData = data;

          if (userData) {
            const formattedUser = {
              id: userData.id,
              email: userData.email,
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              name:
                userData.name ||
                `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
              role: userData.role || 'User',
            };

            localStorage.setItem('user', JSON.stringify(formattedUser));
            console.log('✅ User saved from API');
            return;
          }
        }
      } catch (err) {
        console.log(`⚠️ Endpoint ${endpoint} failed:`, err.message);
        continue;
      }
    }

    console.warn('⚠️ Could not fetch user from any API endpoint');
  };
};