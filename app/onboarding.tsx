import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

// Mock data for the onboarding screens
const onboardingData = [
  {
    title: "Turn Social Media Finds Into Travel Plans",
    description: "Save videos of places you want to visit, and let AI do the organizing",
    renderContent: () => (
      <View style={styles.mockScreenContainer}>
        <View style={styles.mockScreenContent}>
          <View style={styles.mockBrainIcon}>
            <Text style={styles.mockIcon}>🧠</Text>
          </View>
        </View>
      </View>
    )
  },
  {
    title: "Smart Content Analysis",
    description: "Our AI extracts location details, operating hours, and more from your videos automatically",
    renderContent: () => (
      <View style={styles.mockScreenContainer}>
        <View style={styles.mockAnalysisContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressBarFill} />
          </View>
          <View style={styles.mockInfoList}>
            <Text style={styles.mockListItem}>• Location identified: Flax & Kale</Text>
            <Text style={styles.mockListItem}>• Hours: 9AM-4PM</Text>
            <Text style={styles.mockListItem}>• Type: Restaurant</Text>
          </View>
        </View>
      </View>
    )
  },
  {
    title: "Intelligent Itinerary Planning",
    description: "Get AI-optimized travel schedules that make sense geographically and temporally",
    renderContent: () => (
      <View style={styles.mockScreenContainer}>
        <View style={styles.mockItineraryContainer}>
          <Text style={styles.mockDay}>Tuesday, May 12</Text>
          <View style={styles.mockItineraryItem}>
            <Text style={styles.mockItineraryTime}>9:00 AM - Park Güell</Text>
          </View>
          <View style={styles.mockItineraryItem}>
            <Text style={styles.mockItineraryTime}>11:30 AM - Sagrada Familia</Text>
          </View>
        </View>
      </View>
    )
  },
  {
    title: "Adaptive Real-Time Assistance",
    description: "Your AI travel companion adjusts plans for weather, closures, and new opportunities",
    renderContent: () => (
      <View style={styles.mockScreenContainer}>
        <View style={styles.mockAlertContainer}>
          <View style={styles.mockWeatherAlert}>
            <Text style={styles.mockWeatherTitle}>Weather Alert</Text>
            <Text style={styles.mockWeatherDescription}>Afternoon rain expected</Text>
          </View>
          <View style={styles.mockSuggestion}>
            <Text style={styles.mockSuggestionText}>Claude suggests indoor activities</Text>
          </View>
        </View>
      </View>
    )
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  const CurrentContent = onboardingData[currentPage].renderContent;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>onboarding</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <CurrentContent />
        <Text style={styles.title}>{onboardingData[currentPage].title}</Text>
        <Text style={styles.description}>{onboardingData[currentPage].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Text style={styles.nextArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    color: '#1F2937',
    maxWidth: '90%',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    maxWidth: '90%',
  },
  footer: {
    padding: 20,
    marginBottom: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#7C3AED',
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  nextArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Mock screen styles
  mockScreenContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockScreenContent: {
    width: 180,
    height: 280,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockBrainIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockIcon: {
    fontSize: 32,
    color: '#7C3AED',
  },
  
  // Content analysis screen
  mockAnalysisContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 24,
  },
  progressBarFill: {
    width: '70%',
    height: 8,
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  mockInfoList: {
    alignSelf: 'flex-start',
  },
  mockListItem: {
    fontSize: 14,
    marginBottom: 8,
    color: '#1F2937',
  },
  
  // Itinerary screen
  mockItineraryContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  mockDay: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  mockItineraryItem: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  mockItineraryTime: {
    fontSize: 14,
    color: '#1F2937',
  },
  
  // Weather screen
  mockAlertContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
  },
  mockWeatherAlert: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  mockWeatherTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
  },
  mockWeatherDescription: {
    fontSize: 14,
    color: '#92400E',
  },
  mockSuggestion: {
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
  },
  mockSuggestionText: {
    fontSize: 14,
    color: '#6B21A8',
  },
}); 