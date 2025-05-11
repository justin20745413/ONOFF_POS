import React from 'react';
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { theme } from '@/styles/theme';
import { ProductsList } from '@/components/pos/ProductsList';
import { Cart } from '@/components/pos/Cart';
import { LoginForm } from '@/components/LoginForm';
import { useAuthStore } from '@/store/authStore';

export default function POSScreen() {
  const { width, height } = useWindowDimensions();
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <LoginForm />
      </SafeAreaView>
    );
  }
  
  const isLandscape = width > height;
  const cartWidth = isLandscape ? width * 0.35 : width * 0.9;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.productsContainer, isLandscape && styles.productsContainerLandscape]}>
          <ProductsList />
        </View>
        
        <View style={[
          styles.cartContainer,
          isLandscape ? { width: cartWidth } : { height: height * 0.4 },
        ]}>
          <Cart />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  productsContainer: {
    flex: 1,
  },
  productsContainerLandscape: {
    flexDirection: 'row',
  },
  cartContainer: {
    backgroundColor: theme.colors.white,
    ...theme.shadows.md,
  },
});