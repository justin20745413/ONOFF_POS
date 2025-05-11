import { create } from 'zustand';
import { User } from '@/types/api';
import { apiClient } from '@/api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 定義認證狀態介面
interface AuthState {
  user: User | null;        // 當前登入用戶
  token: string | null;          // 認證 token
  isAuthenticated: boolean;      // 是否已認證
  isLoading: boolean;           // 載入狀態
  userType: 'pos' | 'admin';  // 修改用戶類型為 'pos' | 'admin'
  login: (username: string, password: string, userType?: 'pos' | 'admin') => Promise<boolean>; // 修正userType參數
  logout: () => Promise<void>;   // 登出方法
}

// 創建認證狀態管理
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userType: 'pos' as const,
  
  login: async (username: string, password: string, userType: 'pos' | 'admin' = 'pos') => {
    set({ isLoading: true });
    
    try {
      const response = await apiClient.login(username, password, userType);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // 確保用戶類型對齊
        if (user && user.user_type !== userType) {
          user.user_type = userType;
        }
        
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('user_type', userType);  // 儲存用戶類型
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          userType
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      set({ isLoading: false });
      console.error('登入錯誤:', error);
      return false;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_type');
    set({
      user: null,
      token: null, 
      isAuthenticated: false,
      userType: 'admin' as const
    });
  }
}));