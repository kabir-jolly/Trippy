import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, FileText, MapPin, Clock, ArrowRight } from 'lucide-react-native';

export default function TripContentScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Trip Content</Text>
          <Text style={styles.headerSubtitle}>Barcelona, Spain</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.contentItem}>
          <View style={styles.contentIcon}>
            <FileText size={24} color="#7C3AED" />
          </View>
          <View style={styles.contentDetails}>
            <Text style={styles.contentTitle}>Barcelona Travel Guide</Text>
            <Text style={styles.contentType}>PDF Document</Text>
            <Text style={styles.contentDescription}>Comprehensive guide with tips and recommendations</Text>
          </View>
        </View>

        <View style={styles.contentItem}>
          <View style={styles.contentIcon}>
            <MapPin size={24} color="#7C3AED" />
          </View>
          <View style={styles.contentDetails}>
            <Text style={styles.contentTitle}>Barcelona City Map</Text>
            <Text style={styles.contentType}>Interactive Map</Text>
            <Text style={styles.contentDescription}>Marked with all key attractions and routes</Text>
          </View>
        </View>

        <View style={styles.contentItem}>
          <View style={styles.contentIcon}>
            <Clock size={24} color="#7C3AED" />
          </View>
          <View style={styles.contentDetails}>
            <Text style={styles.contentTitle}>Opening Hours</Text>
            <Text style={styles.contentType}>Schedule</Text>
            <Text style={styles.contentDescription}>Opening hours for all attractions and restaurants</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/add-travel-content')}
        >
          <Text style={styles.continueButtonText}>Analyze Content</Text>
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
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
  },
  contentIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F3E8FF',
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