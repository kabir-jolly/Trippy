import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  icon, 
  disabled = false,
  loading = false
}: ButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];
  
  // Determine button styles based on variant
  let backgroundColor;
  let textColor;
  let borderColor;
  
  switch(variant) {
    case 'primary':
      backgroundColor = colors.primary;
      textColor = colors.buttonText;
      borderColor = 'transparent';
      break;
    case 'secondary':
      backgroundColor = colors.secondary;
      textColor = colors.buttonText;
      borderColor = 'transparent';
      break;
    case 'outline':
      backgroundColor = 'transparent';
      textColor = colors.primary;
      borderColor = colors.primary;
      break;
    case 'ghost':
      backgroundColor = 'transparent';
      textColor = colors.primary;
      borderColor = 'transparent';
      break;
  }
  
  // Determine padding based on size
  let paddingVertical;
  let paddingHorizontal;
  let fontSize;
  
  switch(size) {
    case 'small':
      paddingVertical = 8;
      paddingHorizontal = 12;
      fontSize = 14;
      break;
    case 'large':
      paddingVertical = 16;
      paddingHorizontal = 24;
      fontSize = 18;
      break;
    default: // medium
      paddingVertical = 12;
      paddingHorizontal = 16;
      fontSize = 16;
  }
  
  // Apply opacity if disabled
  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { 
          backgroundColor, 
          borderColor,
          paddingVertical,
          paddingHorizontal,
          opacity
        }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={textColor} 
          style={styles.icon} 
        />
      ) : icon && (
        <>{icon}</>
      )}
      <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontWeight: '600',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  }
}); 