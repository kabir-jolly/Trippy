import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DetailItem } from '@/components/DetailItem';

export default function ContentAnalysisScreen() {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </TouchableOpacity>
        <ThemedText type="title">Content Analysis</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.previewContainer}>
          <View style={styles.previewIcon}>
            <IconSymbol name="doc.text.fill" size={20} color="#fff" />
          </View>
          <Text style={styles.previewText}>TikTok Preview</Text>
        </View>

        <View style={styles.analysisContainer}>
          <View style={styles.analysisHeader}>
            <View style={styles.analysisIcon}>
              <IconSymbol name="house.fill" size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.analysisTitle}>Claude</Text>
              <Text style={styles.analysisSubtitle}>Processing Content</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressText}>Audio Transcription</Text>
            <Text style={styles.progressSubtext}>Converting speech to text</Text>
          </View>

          <View style={styles.logContainer}>
            <Text style={styles.logTitle}>Detection Log</Text>
            <View style={styles.logItems}>
              <LogItem text="Initializing analysis..." />
              <LogItem text="Restaurant detected (89% confidence)" />
              <LogItem text="Location: 'Flax & Kale'" color="#4CAF50" />
              <LogItem text="Hours: '9AM-4PM'" color="#4CAF50" />
            </View>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Flax & Kale</Text>
          
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>Confidence:</Text>
            <View style={styles.confidenceBar}>
              <View style={[styles.confidenceFill, { width: '80%' }]} />
            </View>
            <Text style={styles.confidenceValue}>89%</Text>
          </View>

          <View style={styles.detailsContainer}>
            <DetailItem
              icon="house.fill"
              label="Address"
              value="Carrer dels Tallers, 74B, Barcelona"
              source="Context"
            />
            <DetailItem
              icon="clock.fill"
              label="Hours"
              value="9:00 AM - 4:00 PM"
              source="On-screen text"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="brain.head.profile" size={20} color={Colors.light.tint} />
            <ThemedText type="subtitle">Location Details</ThemedText>
          </View>

          <DetailItem
            icon="location.fill"
            label="Location"
            value="Bali, Indonesia"
            source="Google Places API"
          />
          <DetailItem
            icon="clock.fill"
            label="Best Time to Visit"
            value="April to October"
            source="Weather API"
          />
          <DetailItem
            icon="person.2.fill"
            label="Popular Activities"
            value="Beaches, Temples, Water Sports"
            source="TripAdvisor API"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Edit Data"
          onPress={() => {}}
          variant="secondary"
          icon={<IconSymbol name="pencil" size={18} color={Colors.light.tint} />}
        />
        <Button
          title="Continue"
          onPress={() => router.push('/create-trip')}
          icon={<IconSymbol name="arrow.right" size={18} color="#fff" />}
        />
      </View>
    </ThemedView>
  );
}

function LogItem({ text, color = '#fff' }: { text: string; color?: string }) {
  return (
    <View style={styles.logItem}>
      <View style={styles.logDot} />
      <Text style={[styles.logText, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1C1C1E',
  },
  backButton: {
    marginRight: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  previewText: {
    color: '#666',
    fontSize: 14,
  },
  analysisContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  analysisSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#3A3A3C',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  progressSubtext: {
    fontSize: 12,
    color: '#999',
  },
  logContainer: {
    backgroundColor: '#3A3A3C',
    borderRadius: 8,
    padding: 12,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
  },
  logItems: {
    gap: 8,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.tint,
    marginRight: 8,
  },
  logText: {
    fontSize: 12,
    color: '#fff',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  confidenceBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginRight: 8,
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  detailsContainer: {
    gap: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
}); 