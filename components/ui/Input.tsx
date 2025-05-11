import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '@/styles/theme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  disabled = false,
  style,
  inputStyle,
  labelStyle,
  leftIcon,
  rightIcon,
  multiline = false,
  numberOfLines = 1,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = secureTextEntry;
  const inputSecureTextEntry = isPasswordField ? !showPassword : false;

  const leftIconElement = leftIcon && React.cloneElement(leftIcon as React.ReactElement, {
    color: error ? theme.colors.red[500] : theme.colors.gray[500],
    size: 20,
  });

  const rightIconElement = rightIcon && React.cloneElement(rightIcon as React.ReactElement, {
    color: error ? theme.colors.red[500] : theme.colors.gray[500],
    size: 20,
  });

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, error && styles.errorLabel, labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        error && styles.inputError,
        disabled && styles.inputDisabled,
      ]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIconElement}
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || isPasswordField) && styles.inputWithRightIcon,
            inputStyle,
            multiline && styles.multilineInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={inputSecureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
        />
        
        {isPasswordField && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {showPassword ? (
              <EyeOff size={20} color={theme.colors.gray[500]} />
            ) : (
              <Eye size={20} color={theme.colors.gray[500]} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPasswordField && (
          <View style={styles.rightIconContainer}>
            {rightIconElement}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[3],
  },
  label: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing[1],
  },
  errorLabel: {
    color: theme.colors.red[600],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.white,
  },
  inputError: {
    borderColor: theme.colors.red[500],
  },
  inputDisabled: {
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[300],
  },
  input: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
  },
  inputWithLeftIcon: {
    paddingLeft: theme.spacing[1],
  },
  inputWithRightIcon: {
    paddingRight: theme.spacing[1],
  },
  multilineInput: {
    paddingTop: theme.spacing[2],
    textAlignVertical: 'top',
  },
  leftIconContainer: {
    paddingLeft: theme.spacing[3],
  },
  rightIconContainer: {
    paddingRight: theme.spacing[3],
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.xs,
    color: theme.colors.red[600],
    marginTop: theme.spacing[1],
  },
});