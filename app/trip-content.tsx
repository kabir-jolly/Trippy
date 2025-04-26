import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Video, Plus, ArrowRight } from 'lucide-react-native';
import { getTripById, Trip, TripContent } from '@/utils/storage';

export default function TripContentScreen() {
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

  const renderContentItem = (content: TripContent) => (
    <View key={content.id} style={styles.contentItem}>
      <View style={styles.contentIcon}>
        <Video size={24} color="#7C3AED" />
      </View>
      <View style={styles.contentDetails}>
        <Text style={styles.contentTitle}>{content.title}</Text>
        <Text style={styles.contentType}>{content.type} • {content.subtitle}</Text>
        <Text style={styles.contentDescription}>
          {content.location} {content.hours ? `• ${content.hours}` : ''}
        </Text>
      </View>
    </View>
  );

  const renderEmptyContent = () => (
    <View style={styles.emptyContent}>
      <Text style={styles.emptyTitle}>No content added yet</Text>
      <Text style={styles.emptyDescription}>
        Add TikToks or Reels to help build your perfect itinerary
      </Text>
      <TouchableOpacity 
        style={styles.addContentButton}
        onPress={() => router.push({
          pathname: '/add-travel-content',
          params: { tripId }
        })}
      >
        <Plus size={18} color="#7C3AED" />
        <Text style={styles.addContentText}>Add Content</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Trip Content</Text>
            <Text style={styles.headerSubtitle}>Loading...</Text>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
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
          <Text style={styles.headerTitle}>Trip Content</Text>
          <Text style={styles.headerSubtitle}>{trip?.destination || 'Your Trip'}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {trip?.content && trip.content.length > 0 ? (
          trip.content.map(renderContentItem)
        ) : (
          renderEmptyContent()
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push({
            pathname: '/add-travel-content',
            params: { tripId }
          })}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push({
            pathname: '/itinerary-planning',
            params: { tripId }
          })}
        >
          <Text style={styles.continueButtonText}>Continue to Planning</Text>
          <ArrowRight size={18} color="#fff" />
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
  content: {
    flex: 1,
    padding: 20,
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  contentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contentDetails: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  contentType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  continueButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addContentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 8,
  },
  addContentText: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '500',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 