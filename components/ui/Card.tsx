import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  style,
  variant = 'elevated',
  padding = 'md',
}: CardProps) {
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'sm':
        return { padding: theme.spacing[2] };
      case 'md':
        return { padding: theme.spacing[4] };
      case 'lg':
        return { padding: theme.spacing[6] };
      default:
        return { padding: theme.spacing[4] };
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: theme.colors.white,
          ...theme.shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: theme.colors.white,
          borderWidth: 1,
          borderColor: theme.colors.gray[200],
        };
      case 'flat':
        return {
          backgroundColor: theme.colors.white,
        };
      default:
        return {
          backgroundColor: theme.colors.white,
          ...theme.shadows.md,
        };
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyle(),
        getPaddingStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
});