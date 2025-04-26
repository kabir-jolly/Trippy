import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock, Plus, ArrowRight } from 'lucide-react-native';

export default function ContentWithItemsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Add Content</Text>
          <Text style={styles.headerSubtitle}>Barcelona, Spain</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>TikTok</Text>
            </View>
            <Text style={styles.confidence}>89% confidence</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.thumbnail}>
              <MapPin size={16} color="#7C3AED" />
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>Flax & Kale</Text>
              <Text style={styles.subtitle}>Restaurant • Breakfast</Text>

              <View style={styles.infoRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.infoText}>Carrer dels Tallers, Barcelona</Text>
              </View>

              <View style={styles.infoRow}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.infoText}>9:00 AM - 4:00 PM</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Reel</Text>
            </View>
            <Text style={styles.confidence}>93% confidence</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.thumbnail}>
              <MapPin size={16} color="#7C3AED" />
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>Sagrada Familia</Text>
              <Text style={styles.subtitle}>Landmark • Tourist</Text>

              <View style={styles.infoRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.infoText}>Carrer de Mallorca, Barcelona</Text>
              </View>

              <View style={styles.infoRow}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.infoText}>9:00 AM - 6:00 PM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push("/add-content")}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/itinerary-planning')}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  badge: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  confidence: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
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
  },
  continueButton: {
    flex: 1,
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