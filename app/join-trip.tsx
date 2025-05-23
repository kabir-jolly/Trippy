import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function JoinTripScreen() {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <ThemedText type="title">Join Trip</ThemedText>
        {/* Trip joining form will go here */}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
}); 