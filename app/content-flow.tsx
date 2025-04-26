import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, FileText, Brain, Upload, MapPin, Clock, Edit, ArrowRight } from 'lucide-react-native';

export default function ContentFlow() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState('content-empty');
  const [tiktokUrl, setTiktokUrl] = useState('https://www.tiktok.com/@barcelona/video/123456');

  const renderEmptyContent = () => (
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

      <View style={styles.emptyStateContainer}>
        <View style={styles.searchIconContainer}>
          <Search size={32} color="#9CA3AF" />
        </View>
        <Text style={styles.emptyStateTitle}>No Content Yet</Text>
        <Text style={styles.emptyStateDescription}>
          Add TikToks, Reels, or videos from your gallery to start building your trip itinerary.
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setCurrentScreen('add-content')}
        >
          <Text style={styles.addButtonText}>Add Your First Place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddContent = () => (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add Travel Content</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('content-empty')}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.modalDescription}>
          Paste a link to a TikTok or Instagram Reel, or upload a video from your gallery.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={tiktokUrl}
            onChangeText={setTiktokUrl}
            placeholder="Paste TikTok or Reel URL"
          />
          <TouchableOpacity style={styles.inputIcon}>
            <FileText size={20} color="#7C3AED" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.processButton}
          onPress={() => setCurrentScreen('content-analysis')}
        >
          <Text style={styles.processButtonText}>Process Content</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.uploadButton}>
          <Upload size={20} color="#7C3AED" />
          <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContentAnalysis = () => (
    <View style={[styles.container, styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('add-content')} style={styles.backButton}>
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
          onPress={() => router.push('/(tabs)/content-with-items')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <ArrowRight size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  switch (currentScreen) {
    case 'content-empty':
      return renderEmptyContent();
    case 'add-content':
      return renderAddContent();
    case 'content-analysis':
      return renderContentAnalysis();
    default:
      return renderEmptyContent();
  }
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
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  whiteText: {
    color: '#fff',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  searchIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    fontSize: 24,
    color: '#6B7280',
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  processButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  processButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
  },
  uploadButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  previewContainer: {
    padding: 24,
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
    marginTop: 8,
    fontSize: 14,
  },
  analysisContainer: {
    padding: 24,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  analysisSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressContainer: {
    marginBottom: 24,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  progressSubLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  detectionLog: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  detectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
    marginRight: 8,
  },
  logText: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  successText: {
    color: '#34D399',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  confidenceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#6B7280',
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
    backgroundColor: '#34D399',
    borderRadius: 4,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#34D399',
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 16,
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
    fontSize: 12,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
  },
  detailSource: {
    fontSize: 12,
    color: '#7C3AED',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    backgroundColor: '#374151',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
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