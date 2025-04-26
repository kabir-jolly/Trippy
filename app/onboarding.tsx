import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Brain, MapPin, Calendar, Cloud } from 'lucide-react-native';

const onboardingData = [
  {
    title: "Turn Social Media Finds Into Travel Plans",
    description: "Save videos of places you want to visit, and let AI do the organizing",
    icon: Brain,
  },
  {
    title: "Smart Content Analysis",
    description: "Our AI extracts location details, operating hours, and more from your videos automatically",
    icon: MapPin,
  },
  {
    title: "Intelligent Itinerary Planning",
    description: "Get AI-optimized travel schedules that make sense geographically and temporally",
    icon: Calendar,
  },
  {
    title: "Adaptive Real-Time Assistance",
    description: "Your AI travel companion adjusts plans for weather, closures, and new opportunities",
    icon: Cloud,
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push('/create-trip');
    }
  };

  const handleSkip = () => {
    router.push('/create-trip');
  };

  const Icon = onboardingData[currentPage].icon;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon size={64} color="#7C3AED" />
        </View>
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

        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextText}>
              {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingVertical: 12,
    borderRadius: 12,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 