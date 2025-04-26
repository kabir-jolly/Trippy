import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, ArrowRight } from 'lucide-react-native';

export default function FinalItinerary() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Your Itinerary</Text>
          <Text style={styles.headerSubtitle}>Barcelona, Spain</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>Day 1 - May 10</Text>
            <Text style={styles.daySubtitle}>Arrival Day</Text>
          </View>

          <View style={styles.schedule}>
            <View style={styles.scheduleItem}>
              <View style={styles.timeColumn}>
                <Text style={styles.time}>9:00</Text>
                <Text style={styles.timePeriod}>AM</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.itemTitle}>Flax & Kale</Text>
                <Text style={styles.itemType}>Breakfast</Text>
                <View style={styles.location}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={styles.locationText}>Carrer dels Tallers, 74B</Text>
                </View>
              </View>
            </View>

            <View style={styles.scheduleItem}>
              <View style={styles.timeColumn}>
                <Text style={styles.time}>11:30</Text>
                <Text style={styles.timePeriod}>AM</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.itemTitle}>Sagrada Familia</Text>
                <Text style={styles.itemType}>Sightseeing</Text>
                <View style={styles.location}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={styles.locationText}>Carrer de Mallorca, 401</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/trip-details')}
        >
          <Text style={styles.continueButtonText}>View Trip Details</Text>
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
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  dayHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  daySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  schedule: {
    padding: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeColumn: {
    width: 48,
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  timePeriod: {
    fontSize: 12,
    color: '#6B7280',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  itemType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
}); 