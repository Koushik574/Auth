// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState } from 'react';
import { login, register, saveToken, removeToken, getToken } from '../services/authService';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(getToken() || null);

  const handleLogin = async (userData) => {
    const data = await login(userData);
    if (data.token) {
      saveToken(data.token);
      setAuthData(data);
    }
    return data;
  };

  const handleRegister = async (userData) => {
    return await register(userData);
  };

  const handleLogout = () => {
    removeToken();
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
