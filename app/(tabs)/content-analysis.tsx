import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DetailItem } from '@/components/DetailItem';
import { getTripById, Trip, TripContent } from '@/utils/storage';

export default function ContentAnalysisScreen() {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;
  const { tripId, contentId } = useLocalSearchParams<{ tripId: string, contentId: string }>();
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [content, setContent] = useState<TripContent | null>(null);

  useEffect(() => {
    if (tripId) {
      loadTripAndContent();
    } else {
      setLoading(false);
    }
  }, [tripId, contentId]);

  const loadTripAndContent = async () => {
    try {
      const tripDetails = await getTripById(tripId);
      setTrip(tripDetails);
      
      if (tripDetails && contentId) {
        const contentItem = tripDetails.content.find(item => item.id === contentId);
        if (contentItem) {
          setContent(contentItem);
        }
      }
    } catch (error) {
      console.error('Error loading trip details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <IconSymbol name="arrow.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText type="title">Content Analysis</ThemedText>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text style={styles.loadingText}>Analyzing content...</Text>
        </View>
      </ThemedView>
    );
  }

  if (!content) {
    return (
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <IconSymbol name="arrow.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText type="title">Content Error</ThemedText>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Content not found</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="secondary"
          />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </TouchableOpacity>
        <ThemedText type="title">Content Analysis</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.sourceInfo}>
            <IconSymbol name="play.rectangle" size={40} color="#7C3AED" />
            <View style={styles.sourceTextContainer}>
              <Text style={styles.sourceType}>{content.type}</Text>
              <Text style={styles.confidence}>
                {content.confidence}% confidence
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.placeDetails}>
            <Text style={styles.placeTitle}>{content.title}</Text>
            <Text style={styles.placeType}>{content.subtitle}</Text>

            <DetailItem 
              icon="mappin"
              label="Location"
              value={content.location || 'Location not available'}
              source={content.type}
            />

            <DetailItem 
              icon="clock"
              label="Hours"
              value={content.hours || 'Hours not available'}
              source={content.type}
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What we found</Text>
          <Text style={styles.infoText}>
            We analyzed your {content.type} and identified a popular location in {trip?.destination || 'your destination'}. We've extracted key details such as location and hours to help you plan your trip.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Edit Data"
          onPress={() => {}}
          variant="secondary"
          icon={<IconSymbol name="pencil" size={18} color={Colors.light.tint} />}
        />
        <Button
          title="Continue"
          onPress={() => router.push({
            pathname: '/trip-content',
            params: { tripId }
          })}
          icon={<IconSymbol name="arrow.right" size={18} color="#fff" />}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sourceTextContainer: {
    marginLeft: 16,
  },
  sourceType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  placeDetails: {
    marginBottom: 8,
  },
  placeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 24,
  },
}); 