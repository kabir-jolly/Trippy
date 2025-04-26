import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Link } from 'expo-router';
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Ready to plan your next adventure?
          </Text>
        </View>

        <View style={styles.actionCards}>
          <Link href="/create-trip" asChild>
            <TouchableOpacity style={styles.primaryCard}>
              <View style={styles.cardContent}>
                <View style={styles.primaryIconContainer}>
                  <IconSymbol
                    name="plus"
                    size={24}
                    weight="bold"
                    color="#fff"
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.primaryCardTitle}>
                    Create New Trip
                  </Text>
                  <Text style={styles.primaryCardDescription}>
                    Start planning your next adventure
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
          
          <Link href="/join-trip" asChild>
            <TouchableOpacity style={styles.secondaryCard}>
              <View style={styles.cardContent}>
                <View style={styles.secondaryIconContainer}>
                  <IconSymbol
                    name="person.2"
                    size={24}
                    weight="bold"
                    color="#007AFF"
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.secondaryCardTitle}>
                    Join Trip
                  </Text>
                  <Text style={styles.secondaryCardDescription}>
                    Join an existing trip with friends
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.recentTrips}>
          <Text style={styles.sectionTitle}>
            Recent Trips
          </Text>
          <View style={styles.emptyState}>
            <IconSymbol
              name="airplane"
              size={48}
              weight="light"
              color={theme === 'light' ? Colors.light.text : Colors.dark.text}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateText}>
              No trips yet. Create or join a trip to get started!
            </Text>
          </View>
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
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    color: '#000',
  },
  actionCards: {
    gap: 16,
    marginBottom: 32,
  },
  primaryCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  secondaryCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  primaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  secondaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  primaryCardTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
    fontWeight: '600',
  },
  primaryCardDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  secondaryCardTitle: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 4,
    fontWeight: '600',
  },
  secondaryCardDescription: {
    fontSize: 14,
    color: '#000',
    opacity: 0.8,
  },
  recentTrips: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#000',
    fontWeight: '600',
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
    color: '#000',
  },
});
