import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, FileUp, Home } from 'lucide-react-native';
import { addContentToTrip, getTripById, TripContent } from '@/utils/storage';

export default function AddTravelContentScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const [linkInput, setLinkInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tripDestination, setTripDestination] = useState('');

  useEffect(() => {
    if (tripId) {
      loadTripDetails();
    }
  }, [tripId]);

  const loadTripDetails = async () => {
    try {
      const trip = await getTripById(tripId);
      if (trip) {
        setTripDestination(trip.destination);
      }
    } catch (error) {
      console.error('Error loading trip details:', error);
    }
  };

  const handleProcess = async () => {
    if (!linkInput.trim()) {
      return;
    }

    if (!tripId) {
      Alert.alert('Error', 'No trip ID provided. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      // Mock analysis data - in a real app, this would come from an API
      const contentItem: TripContent = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'TikTok' : 'Reel',
        url: linkInput,
        title: 'Sagrada Familia',
        subtitle: 'Landmark • Tourist',
        location: 'Carrer de Mallorca, Barcelona',
        hours: '9:00 AM - 6:00 PM',
        confidence: Math.round(Math.random() * 20 + 80), // Random between 80-100
      };

      await addContentToTrip(tripId, contentItem);
      
      router.push({
        pathname: '/content-analysis',
        params: { 
          tripId,
          contentId: contentItem.id
        }
      });
    } catch (error) {
      console.error('Error processing content:', error);
      Alert.alert('Error', 'Failed to process content. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add Travel Content</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.push("/")} style={styles.homeButton}>
              <Home size={24} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.modalDescription}>
          Paste a link to a TikTok or Instagram Reel, or upload a video from your gallery.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="https://www.tiktok.com/@barcelona/video/123..."
            value={linkInput}
            onChangeText={setLinkInput}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.pasteButton}>
            <FileUp size={24} color="#7C3AED" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.processButton, 
            (!linkInput.trim() || isProcessing) && styles.processButtonDisabled
          ]}
          onPress={handleProcess}
          disabled={!linkInput.trim() || isProcessing}
        >
          <Text style={styles.processButtonText}>
            {isProcessing ? 'Processing...' : 'Process Content'}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity 
          style={[styles.uploadButton, isProcessing && styles.uploadButtonDisabled]}
          disabled={isProcessing}
          onPress={() => {
            Alert.alert('Coming Soon', 'Upload from gallery will be available in the next update.');
          }}
        >
          <FileUp size={24} color="#7C3AED" />
          <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
        </TouchableOpacity>

        {tripDestination && (
          <Text style={styles.tripInfo}>
            Adding content to: {tripDestination}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  homeButton: {
    padding: 4,
    marginRight: 16,
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  pasteButton: {
    padding: 12,
  },
  processButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  processButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  processButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 14,
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  uploadButtonDisabled: {
    borderColor: '#D1D5DB',
    opacity: 0.7,
  },
  uploadButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tripInfo: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 12,
  },
}); 