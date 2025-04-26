import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import { getTripById, Trip } from '@/utils/storage';

export default function ContentEmptyScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      loadTripDetails();
    } else {
      setLoading(false);
    }
  }, [tripId]);

  const loadTripDetails = async () => {
    try {
      const tripDetails = await getTripById(tripId);
      setTrip(tripDetails);
    } catch (error) {
      console.error('Error loading trip details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Add Content</Text>
            <Text style={styles.headerSubtitle}>Loading...</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!trip && tripId) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Add Content</Text>
            <Text style={styles.headerSubtitle}>Trip not found</Text>
          </View>
        </View>

        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Error</Text>
          <Text style={styles.emptyStateDescription}>
            Trip information could not be loaded. Please try again.
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.addButtonText}>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Add Content</Text>
          <Text style={styles.headerSubtitle}>{trip?.destination || 'Your Trip'}</Text>
        </View>
      </View>

      <View style={styles.emptyStateContainer}>
        <View style={styles.searchIconContainer}>
          <Search size={32} color="#9CA3AF" />
        </View>
        <Text style={styles.emptyStateTitle}>No Content Yet</Text>
        <Text style={styles.emptyStateDescription}>
          Add TikToks, Reels, or videos from your gallery to start building your trip itinerary.
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push({
            pathname: "/add-travel-content",
            params: { tripId }
          })}
        >
          <Text style={styles.addButtonText}>Add Your First Place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  searchIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  emptyStateDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 32,
  },
  addButton: {
    width: '100%',
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 