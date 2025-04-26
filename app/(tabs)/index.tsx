import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Your Trips</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Start planning your next adventure
          </ThemedText>
        </View>

        <View style={styles.buttons}>
          <Link href="/create-trip" asChild>
            <TouchableOpacity style={[styles.button, styles.primaryButton]}>
              <IconSymbol
                name="plus"
                size={20}
                weight="medium"
                color="#fff"
                style={styles.buttonIcon}
              />
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Create New Trip
              </ThemedText>
            </TouchableOpacity>
          </Link>
          
          <Link href="/join-trip" asChild>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
              <IconSymbol
                name="person.2"
                size={20}
                weight="medium"
                color={theme === 'light' ? Colors.light.tint : Colors.dark.tint}
                style={styles.buttonIcon}
              />
              <ThemedText type="defaultSemiBold" style={[styles.buttonText, styles.secondaryButtonText]}>
                Join Trip
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.emptyState}>
          <IconSymbol
            name="airplane"
            size={48}
            weight="light"
            color={theme === 'light' ? Colors.light.text : Colors.dark.text}
            style={styles.emptyStateIcon}
          />
          <ThemedText type="default" style={styles.emptyStateText}>
            No trips yet. Create or join a trip to get started!
          </ThemedText>
        </View>
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
  header: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  buttons: {
    gap: 12,
    marginBottom: 32,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.light.tint,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: Colors.light.tint,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateText: {
    textAlign: 'center',
  },
});
