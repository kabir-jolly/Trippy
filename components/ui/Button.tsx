import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export function Button({ title, onPress, variant = 'primary', icon }: ButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = variant === 'primary' ? Colors.light.tint : '#F5F5F5';
  const textColor = variant === 'primary' ? '#fff' : Colors.light.tint;
  const borderColor = variant === 'secondary' ? Colors.light.tint : 'transparent';

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      {icon}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 