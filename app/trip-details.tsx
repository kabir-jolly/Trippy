import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Users, Clock } from 'lucide-react-native';

export default function TripDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Trip Details</Text>
          <Text style={styles.headerSubtitle}>Barcelona, Spain</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trip Information</Text>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Calendar size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Dates</Text>
              <Text style={styles.infoValue}>May 10 - May 15, 2025</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <MapPin size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Destination</Text>
              <Text style={styles.infoValue}>Barcelona, Spain</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Users size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Travelers</Text>
              <Text style={styles.infoValue}>3 people</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Places to Visit</Text>
          
          <View style={styles.placeItem}>
            <Text style={styles.placeName}>Flax & Kale</Text>
            <Text style={styles.placeType}>Restaurant • Breakfast</Text>
            <View style={styles.placeDetails}>
              <View style={styles.placeDetail}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.placeDetailText}>Carrer dels Tallers, 74B</Text>
              </View>
              <View style={styles.placeDetail}>
                <Clock size={14} color="#6B7280" />
                <Text style={styles.placeDetailText}>9:00 AM - 4:00 PM</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.placeItem}>
            <Text style={styles.placeName}>Sagrada Familia</Text>
            <Text style={styles.placeType}>Landmark • Tourist</Text>
            <View style={styles.placeDetails}>
              <View style={styles.placeDetail}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.placeDetailText}>Carrer de Mallorca, 401</Text>
              </View>
              <View style={styles.placeDetail}>
                <Clock size={14} color="#6B7280" />
                <Text style={styles.placeDetailText}>9:00 AM - 6:00 PM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  placeItem: {
    marginBottom: 16,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  placeDetails: {
    gap: 4,
  },
  placeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
}); 