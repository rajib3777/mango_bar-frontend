import { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, profileApi } from '@/api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load user if token exists
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setAuthLoading(false);
      return;
    }

    profileApi()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('accessToken');
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });

    const data = res.data || {};
    const token = data.access || data.token || data.key;

    if (token) {
      localStorage.setItem('accessToken', token);
    }
    // jodi backend user object dey
    if (data.user) {
      setUser(data.user);
    } else {
      // pore profile load korbo
      try {
        const profileRes = await profileApi();
        setUser(profileRes.data);
      } catch {
        /* ignore */
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
