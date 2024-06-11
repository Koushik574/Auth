import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'https://auth-4o0i.onrender.com';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const saveToken = (token) => {
  localStorage.setItem('accessToken', token.accesToken);
  localStorage.setItem('refreshToken', token.refreshToken);
};

export const getToken = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
