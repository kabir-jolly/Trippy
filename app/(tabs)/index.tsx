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
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  actionCards: {
    marginBottom: 24,
  },
  primaryCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  secondaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  primaryCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  primaryCardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  secondaryCardDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  upcomingTrips: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  tripsList: {
    paddingBottom: 20,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  destinationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripHeaderText: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: '#6B7280',
  },
  tripMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tripMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  tripMetaText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  addContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addContentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7C3AED',
    marginRight: 6,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    maxWidth: '80%',
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  deleteAction: {
    backgroundColor: '#EF4444', // Red color
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 12,
    marginBottom: 12,
  },
});
