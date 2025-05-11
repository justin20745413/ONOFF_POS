import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '@/styles/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary[600],
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: theme.colors.gray[200],
        borderWidth: 0,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary[600],
      },
      danger: {
        backgroundColor: theme.colors.red[600],
        borderWidth: 0,
      },
      success: {
        backgroundColor: theme.colors.green[600],
        borderWidth: 0,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    };

    const sizeStyles = {
      sm: {
        paddingVertical: theme.spacing[1],
        paddingHorizontal: theme.spacing[3],
        borderRadius: theme.radius.md,
      },
      md: {
        paddingVertical: theme.spacing[2],
        paddingHorizontal: theme.spacing[4],
        borderRadius: theme.radius.md,
      },
      lg: {
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[6],
        borderRadius: theme.radius.lg,
      },
    };

    return [
      styles.button,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      style,
    ];
  };

  const getTextStyle = () => {
    const baseStyle = styles.buttonText;
    
    const variantTextStyles = {
      primary: {
        color: theme.colors.white,
      },
      secondary: {
        color: theme.colors.gray[800],
      },
      outline: {
        color: theme.colors.primary[600],
      },
      danger: {
        color: theme.colors.white,
      },
      success: {
        color: theme.colors.white,
      },
      ghost: {
        color: theme.colors.primary[600],
      },
    };

    const sizeTextStyles = {
      sm: {
        fontSize: theme.typography.size.sm,
      },
      md: {
        fontSize: theme.typography.size.base,
      },
      lg: {
        fontSize: theme.typography.size.lg,
      },
    };

    return [
      baseStyle,
      variantTextStyles[variant],
      sizeTextStyles[size],
      textStyle,
    ];
  };

  const getIconColor = () => {
    const variantColors = {
      primary: theme.colors.white,
      secondary: theme.colors.gray[800],
      outline: theme.colors.primary[600],
      danger: theme.colors.white,
      success: theme.colors.white,
      ghost: theme.colors.primary[600],
    };

    return variantColors[variant];
  };

  const iconElement = icon && React.cloneElement(icon as React.ReactElement, {
    color: getIconColor(),
    size: size === 'sm' ? 16 : size === 'md' ? 20 : 24,
  });

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary[600] : theme.colors.white}
          size={size === 'sm' ? 'small' : 'small'}
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{iconElement}</View>
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{iconElement}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: theme.spacing[2],
  },
  iconRight: {
    marginLeft: theme.spacing[2],
  },
});