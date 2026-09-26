import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res && res.data?.user) {
      setUser(res.data.user);
    }
    return res;
  };

  const loginWithGoogle = async (googleData) => {
    const res = await authService.googleAuth(googleData);
    if (res && res.data?.user) {
      setUser(res.data.user);
    }
    return res;
  };

  const register = async (data) => {
    return await authService.register(data);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
