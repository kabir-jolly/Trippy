import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';

export default function FinalItineraryScreen() {
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

          <View style={styles.activityItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeHour}>9:00</Text>
              <Text style={styles.timeAMPM}>AM</Text>
            </View>
            
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Flax & Kale</Text>
              <Text style={styles.activityType}>Breakfast</Text>
              <View style={styles.activityLocation}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.activityAddress}>Carrer dels Tallers, 74B</Text>
              </View>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeHour}>11:30</Text>
              <Text style={styles.timeAMPM}>AM</Text>
            </View>
            
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Sagrada Familia</Text>
              <Text style={styles.activityType}>Sightseeing</Text>
              <View style={styles.activityLocation}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.activityAddress}>Carrer de Mallorca, 401</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => router.push('/map-view')}
        >
          <Text style={styles.mapButtonText}>View Map</Text>
          <MapPin size={18} color="#7C3AED" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => router.push('/weather')}
        >
          <Text style={styles.viewDetailsText}>Check Weather</Text>
          <ArrowLeft size={20} color="#fff" style={styles.arrowIcon} />
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
    padding: 20,
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  dayHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  daySubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
  },
  timeHour: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  timeAMPM: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityContent: {
    flex: 1,
    paddingLeft: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  activityType: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  activityLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  mapButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  mapButtonText: {
    color: '#7C3AED',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  viewDetailsButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
}); 