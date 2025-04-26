import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, FileText, Brain, MapPin, Clock, Edit, ArrowRight } from 'lucide-react-native';

export default function ContentAnalysisScreen() {
  const router = useRouter();

  return (
    <View style={[styles.container, styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, styles.whiteText]}>AI Analysis</Text>
      </View>

      <View style={styles.previewContainer}>
        <View style={styles.tiktokPreview}>
          <FileText size={24} color="#fff" />
          <Text style={styles.previewText}>TikTok Preview</Text>
        </View>
      </View>

      <View style={styles.analysisContainer}>
        <View style={styles.analysisHeader}>
          <View style={styles.brainIconContainer}>
            <Brain size={24} color="#fff" />
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
          <Text style={styles.progressLabel}>Audio Transcription</Text>
          <Text style={styles.progressSubLabel}>Converting speech to text</Text>
        </View>

        <View style={styles.detectionLog}>
          <Text style={styles.detectionTitle}>Detection Log</Text>
          <View style={styles.logItem}>
            <View style={styles.logDot} />
            <Text style={styles.logText}>Initializing analysis...</Text>
          </View>
          <View style={styles.logItem}>
            <View style={styles.logDot} />
            <Text style={styles.logText}>Restaurant detected (89% confidence)</Text>
          </View>
          <View style={styles.logItem}>
            <View style={styles.logDot} />
            <Text style={[styles.logText, styles.successText]}>Location: "Flax & Kale"</Text>
          </View>
          <View style={styles.logItem}>
            <View style={styles.logDot} />
            <Text style={[styles.logText, styles.successText]}>Hours: "9AM-4PM"</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Flax & Kale</Text>
          
          <View style={styles.confidenceBar}>
            <Text style={styles.confidenceLabel}>Confidence:</Text>
            <View style={styles.confidenceBarContainer}>
              <View style={[styles.confidenceBarFill, { width: '89%' }]} />
            </View>
            <Text style={styles.confidenceValue}>89%</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MapPin size={18} color="#7C3AED" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>Carrer dels Tallers, 74B, Barcelona</Text>
                <Text style={styles.detailSource}>Detected via: Context</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Clock size={18} color="#7C3AED" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Hours</Text>
                <Text style={styles.detailValue}>9:00 AM - 4:00 PM</Text>
                <Text style={styles.detailSource}>Detected via: On-screen text</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={18} color="#7C3AED" />
          <Text style={styles.editButtonText}>Edit Data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/content-with-items')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  darkContainer: {
    backgroundColor: '#1F2937',
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
  whiteText: {
    color: '#fff',
  },
  previewContainer: {
    padding: 20,
  },
  tiktokPreview: {
    height: 120,
    backgroundColor: '#000',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 8,
  },
  analysisContainer: {
    padding: 20,
    flex: 1,
  },
  analysisHeader: {
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
  analysisTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  analysisSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  progressLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  progressSubLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  detectionLog: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  detectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
    marginRight: 8,
  },
  logText: {
    color: '#D1D5DB',
    fontSize: 12,
  },
  successText: {
    color: '#10B981',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  confidenceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confidenceLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginRight: 8,
  },
  confidenceBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 8,
  },
  confidenceBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  confidenceValue: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  detailValue: {
    color: '#111827',
    fontSize: 14,
  },
  detailSource: {
    color: '#7C3AED',
    fontSize: 12,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#374151',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 12,
  },
  editButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
}); 