import { API_BASE_URL } from './config';
import { ApiResponse, User } from '@/types/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API 請求失敗');
      }
      
      return data;
    } catch (error) {
      console.error('API 錯誤:', error);
      throw error;
    }
  }

  // 認證相關方法
  async login(username: string, password: string, userType: 'pos' | 'admin' = 'admin'): Promise<ApiResponse<{ user: User; token: string }>> {
    const endpoint = userType === 'pos' 
      ? '/api/pos/auth/login' 
      : '/api/auth/login';
      
    // 如果是 POS 登入，使用不同的參數格式
    const requestBody = userType === 'pos' 
      ? { pos_id: username, secret_key: password }
      : { username, password };
      
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }

  // 商品相關方法
  async getProducts() {
    return this.request('/products');
  }

  // 訂單相關方法
  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }
}

export const apiClient = new ApiClient();
