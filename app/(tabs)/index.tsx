import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList, Alert, Animated } from 'react-native';
import { Link, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getTrips, Trip, deleteTrip } from '@/utils/storage';
import { format, parseISO } from 'date-fns';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const swipeableRefs = useRef<Map<string, Swipeable>>(new Map());

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const userTrips = await getTrips();
      // Sort trips by start date (most recent first)
      userTrips.sort((a, b) => parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime());
      setTrips(userTrips);
    } catch (error) {
      console.error('Error loading trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // Close the swipeable
            const swipeable = swipeableRefs.current.get(tripId);
            if (swipeable) {
              swipeable.close();
            }
          }
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTrip(tripId);
              // Update the UI
              setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
            } catch (error) {
              console.error('Error deleting trip:', error);
              Alert.alert("Error", "Failed to delete trip. Please try again.");
            }
          }
        }
      ]
    );
  };

  const renderRightActions = (tripId: string) => {
    return (
      <RectButton 
        style={styles.deleteAction}
        onPress={() => handleDeleteTrip(tripId)}
      >
        <IconSymbol
          name="trash"
          size={24}
          weight="medium"
          color="#fff"
        />
      </RectButton>
    );
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const renderTripCard = ({ item }: { item: Trip }) => (
    <Swipeable
      ref={(ref) => {
        if (ref) {
          swipeableRefs.current.set(item.id, ref);
        }
      }}
      renderRightActions={() => renderRightActions(item.id)}
      rightThreshold={40}
      overshootRight={false}
    >
      <TouchableOpacity 
        style={styles.tripCard}
        onPress={() => router.push({
          pathname: '/content-empty',
          params: { tripId: item.id }
        })}
      >
        <View style={styles.tripHeader}>
          <View style={styles.destinationIcon}>
            <IconSymbol
              name="mappin"
              size={24}
              weight="bold"
              color="#7C3AED"
            />
          </View>
          <View style={styles.tripHeaderText}>
            <Text style={styles.tripDestination}>{item.destination}</Text>
            <Text style={styles.tripDates}>
              {formatDateRange(item.startDate, item.endDate)}
            </Text>
          </View>
        </View>

        <View style={styles.tripMeta}>
          <View style={styles.tripMetaItem}>
            <IconSymbol
              name="person.2"
              size={16}
              weight="medium"
              color={theme === 'light' ? Colors.light.text : Colors.dark.text}
            />
            <Text style={styles.tripMetaText}>
              {item.travelers} {item.travelers === 1 ? 'traveler' : 'travelers'}
            </Text>
          </View>
          
          <View style={styles.tripMetaItem}>
            <IconSymbol
              name="video"
              size={16}
              weight="medium"
              color={theme === 'light' ? Colors.light.text : Colors.dark.text}
            />
            <Text style={styles.tripMetaText}>
              {item.content?.length || 0} videos
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addContent}
          onPress={() => router.push({
            pathname: '/add-travel-content',
            params: { tripId: item.id }
          })}
        >
          <Text style={styles.addContentText}>Add Content</Text>
          <IconSymbol
            name="plus"
            size={16}
            weight="bold"
            color="#7C3AED"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );

  const renderEmptyTrips = () => (
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
  );

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

        <View style={styles.upcomingTrips}>
          <Text style={styles.sectionTitle}>
            Upcoming Trips
          </Text>
          
          {loading ? (
            <View style={styles.loadingState}>
              <Text style={styles.loadingText}>Loading trips...</Text>
            </View>
          ) : trips.length > 0 ? (
            <FlatList
              data={trips}
              renderItem={renderTripCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.tripsList}
            />
          ) : (
            renderEmptyTrips()
          )}
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.muted,
    lineHeight: 22,
  },
  actionCards: {
    marginBottom: 32,
  },
  primaryCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
    shadowColor: Colors.light.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  secondaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  primaryCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  primaryCardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  secondaryCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  secondaryCardDescription: {
    fontSize: 14,
    color: Colors.light.muted,
    lineHeight: 20,
  },
  upcomingTrips: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.light.text,
  },
  tripsList: {
    paddingBottom: 20,
  },
  tripCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
    shadowColor: Colors.light.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  destinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tripHeaderText: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: Colors.light.muted,
    lineHeight: 20,
  },
  tripMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tripMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  tripMetaText: {
    fontSize: 14,
    color: Colors.light.muted,
    marginLeft: 8,
  },
  addContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.cardBorder,
  },
  addContentText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.light.primary,
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.muted,
    maxWidth: '80%',
    lineHeight: 22,
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.muted,
  },
  deleteAction: {
    backgroundColor: Colors.light.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 16,
    marginBottom: 16,
  },
});
