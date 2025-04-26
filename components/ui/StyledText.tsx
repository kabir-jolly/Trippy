import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface StyledTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: 'title' | 'subtitle' | 'heading' | 'subheading' | 'body' | 'caption' | 'label';
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

export function StyledText({ 
  children, 
  style, 
  variant = 'body',
  color = 'default',
  weight = 'regular'
}: StyledTextProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Determine text variant properties
  let fontSize: number;
  let lineHeight: number;
  
  switch (variant) {
    case 'title':
      fontSize = 28;
      lineHeight = 36;
      break;
    case 'subtitle':
      fontSize = 20;
      lineHeight = 28;
      break;
    case 'heading':
      fontSize = 18;
      lineHeight = 26;
      break;
    case 'subheading':
      fontSize = 16;
      lineHeight = 24;
      break;
    case 'body':
      fontSize = 16;
      lineHeight = 24;
      break;
    case 'caption':
      fontSize = 14;
      lineHeight = 20;
      break;
    case 'label':
      fontSize = 12;
      lineHeight = 18;
      break;
  }
  
  // Determine font weight
  let fontWeight: TextStyle['fontWeight'];
  
  switch (weight) {
    case 'regular':
      fontWeight = '400';
      break;
    case 'medium':
      fontWeight = '500';
      break;
    case 'semibold':
      fontWeight = '600';
      break;
    case 'bold':
      fontWeight = '700';
      break;
  }
  
  // Determine text color
  let textColor: string;
  
  switch (color) {
    case 'default':
      textColor = colors.text;
      break;
    case 'muted':
      textColor = colors.muted;
      break;
    case 'primary':
      textColor = colors.primary;
      break;
    case 'secondary':
      textColor = colors.secondary;
      break;
    case 'accent':
      textColor = colors.accent;
      break;
    case 'success':
      textColor = colors.success;
      break;
    case 'error':
      textColor = colors.error;
      break;
    case 'warning':
      textColor = colors.warning;
      break;
  }
  
  return (
    <Text 
      style={[
        { 
          fontSize,
          lineHeight,
          fontWeight,
          color: textColor
        },
        style
      ]}
    >
      {children}
    </Text>
  );
} 