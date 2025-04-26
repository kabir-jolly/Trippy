import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'outline' | 'filled';
}

export function Card({ 
  children, 
  style, 
  elevation = 'small',
  variant = 'default'
}: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Calculate shadow values based on elevation
  let shadowProps = {};
  
  if (elevation !== 'none') {
    const shadowValues = {
      small: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      medium: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 4,
      },
      large: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
      },
    };
    
    shadowProps = shadowValues[elevation];
  }
  
  // Calculate background and border based on variant
  let variantStyle = {};
  
  switch (variant) {
    case 'default':
      variantStyle = {
        backgroundColor: colors.card,
        borderWidth: 0,
      };
      break;
    case 'outline':
      variantStyle = {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      };
      break;
    case 'filled':
      variantStyle = {
        backgroundColor: colors.primary + '10', // 10% opacity
        borderWidth: 0,
      };
      break;
  }
  
  return (
    <View 
      style={[
        styles.card,
        variantStyle,
        { shadowColor: colors.shadow },
        shadowProps,
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
}); 