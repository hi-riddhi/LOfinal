const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  GOOGLE_LOGIN: `${API_BASE_URL}/api/google-login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/forgot-password`,
  RESET_PASSWORD: (token) => `${API_BASE_URL}/api/reset-password/${token}`,
};

export default {
  API_BASE_URL,
  ...API_ENDPOINTS,
};
