import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Brain, ChevronDown, ArrowRight } from 'lucide-react-native';

export default function ItineraryPlanning() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Itinerary</Text>
          <Text style={styles.headerSubtitle}>Barcelona, Spain</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.planningCard}>
          <View style={styles.planningHeader}>
            <View style={styles.brainIconContainer}>
              <Brain size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.planningTitle}>Claude is planning your itinerary</Text>
              <Text style={styles.planningSubtitle}>Creating the perfect schedule</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>

          <View style={styles.optimizationCard}>
            <Text style={styles.optimizationTitle}>Time optimization</Text>
            <Text style={styles.optimizationDescription}>
              Accounting for opening hours and visit durations
            </Text>

            <TouchableOpacity style={styles.thinkingButton}>
              <Text style={styles.thinkingButtonText}>Show Claude's Thinking</Text>
              <ChevronDown size={16} color="#7C3AED" />
            </TouchableOpacity>
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/final-itinerary')}
        >
          <Text style={styles.continueButtonText}>View Final Itinerary</Text>
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
    padding: 24,
  },
  planningCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  planningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  brainIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  planningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  planningSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  optimizationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  optimizationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  optimizationDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  thinkingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  thinkingButtonText: {
    fontSize: 14,
    color: '#7C3AED',
    marginRight: 4,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
    marginHorizontal: 4,
  },
  inactiveDot: {
    backgroundColor: '#E5E7EB',
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