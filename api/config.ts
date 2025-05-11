export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    posLogin: '/pos/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  products: {
    list: '/products',
    detail: (id: number) => `/products/${id}`,
  },
  orders: {
    create: '/orders',
    list: '/orders',
    detail: (id: number) => `/orders/${id}`,
  },
  // ... 其他端點
};
