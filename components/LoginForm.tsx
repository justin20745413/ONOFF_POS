import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Lock, AtSign } from 'lucide-react-native';
import { theme } from '@/styles/theme';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useAuthStore } from '@/store/authStore';

export function LoginForm() {
  // 狀態管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'admin' | 'pos'>('admin');
  
  const { login, isLoading } = useAuthStore();
  
  // 處理登入邏輯
  const handleLogin = async () => {
    // 清除之前的錯誤
    setError('');
    
    // 表單驗證
    if (!username.trim() || !password.trim()) {
      setError('請輸入帳號和密碼');
      return;
    }
    
    try {
      const success = await login(username, password, userType);
      
      if (!success) {
        setError('帳號或密碼錯誤，請重試');
      }
    } catch (err) {
      setError('登入時發生錯誤，請稍後再試');
      console.error('登入錯誤:', err);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* 標誌和標題區域 */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3943726/pexels-photo-3943726.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.logo}
        />
        <Text style={styles.title}>POS 系統</Text>
        <Text style={styles.subtitle}>請登入您的帳號</Text>
      </View>
      
      {/* 錯誤訊息顯示 */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      
      {/* 登入表單 */}
      <View style={styles.form}>
        <Input
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChangeText={setUsername}
          leftIcon={<AtSign />}
          autoCapitalize="none"
        />
        
        <Input
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={<Lock />}
        />
        
        <View style={styles.userTypeContainer}>
          <Text style={styles.label}>登入類型</Text>
          <View style={styles.userTypeOptions}>
            <TouchableOpacity 
              style={[styles.option, userType === 'pos' && styles.selectedOption]}
              onPress={() => setUserType('pos')}
            >
              <Text style={[styles.optionText, userType === 'pos' && styles.selectedText]}>POS 系統</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.option, userType === 'admin' && styles.selectedOption]}
              onPress={() => setUserType('admin')}
            >
              <Text style={[styles.optionText, userType === 'admin' && styles.selectedText]}>系統管理員</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Button
          title="登入"
          onPress={handleLogin}
          loading={isLoading}
          size="lg"
          fullWidth
          style={styles.button}
        />
      </View>
    </View>
  );
}

// 樣式定義
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[4],
    width: '100%',
    maxWidth: 400,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing[3],
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size['3xl'],
    color: theme.colors.primary[600],
    marginBottom: theme.spacing[1],
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[600],
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing[4],
  },
  errorContainer: {
    backgroundColor: theme.colors.red[100],
    borderRadius: theme.radius.md,
    padding: theme.spacing[3],
    marginBottom: theme.spacing[4],
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.red[700],
    textAlign: 'center',
  },
  userTypeContainer: {
    marginBottom: theme.spacing[4],
  },
  label: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing[1],
  },
  userTypeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    padding: theme.spacing[2],
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginRight: theme.spacing[2],
  },
  selectedOption: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  optionText: {
    color: theme.colors.gray[700],
  },
  selectedText: {
    color: theme.colors.primary[600],
  },
});