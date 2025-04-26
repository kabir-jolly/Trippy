import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { markOnboardingCompleted } from '@/utils/storage';

export default function OnboardingScreen() {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;
  const textColor = theme === 'light' ? Colors.light.text : Colors.dark.text;

  const handleContinue = async () => {
    await markOnboardingCompleted();
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconSymbol
            name="airplane"
            size={48}
            weight="bold"
            color={theme === 'light' ? Colors.light.tint : Colors.dark.tint}
          />
          <ThemedText type="title" style={styles.title}>Welcome to Trippy</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Your AI-powered travel planning companion
          </ThemedText>
        </View>

        <View style={styles.features}>
          <FeatureItem
            icon="play.rectangle"
            title="Save Travel Content"
            description="Save Reels and TikToks to automatically create your itinerary"
          />
          <FeatureItem
            icon="map"
            title="Smart Planning"
            description="AI optimizes your schedule based on locations and preferences"
          />
          <FeatureItem
            icon="bubble.left.and.bubble.right"
            title="Travel Assistant"
            description="Get real-time recommendations and alternative plans"
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={handleContinue}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Get Started
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <View style={styles.featureItem}>
      <IconSymbol
        name={icon}
        size={24}
        weight="medium"
        color={theme === 'light' ? Colors.light.tint : Colors.dark.tint}
      />
      <View style={styles.featureText}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <ThemedText type="default" style={styles.featureDescription}>
          {description}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  features: {
    marginTop: 48,
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureText: {
    flex: 1,
  },
  featureDescription: {
    opacity: 0.8,
    marginTop: 4,
  },
  buttons: {
    marginTop: 48,
    marginBottom: 32,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.light.tint,
  },
  buttonText: {
    color: '#fff',
  },
}); 