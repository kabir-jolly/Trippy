import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
  source: string;
}

export function DetailItem({ icon, label, value, source }: DetailItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconSymbol name={icon} size={18} color={Colors.light.tint} />
      </View>
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold">{label}</ThemedText>
        <ThemedText>{value}</ThemedText>
        <ThemedText type="subtitle" style={styles.source}>
          Source: {source}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  source: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
}); 