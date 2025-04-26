import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { FileText, Upload, X } from 'lucide-react-native';

export default function AddContentScreen() {
  const router = useRouter();
  const [tiktokUrl, setTiktokUrl] = useState('https://www.tiktok.com/@barcelona/video/123456');

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add Travel Content</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color="#374151" />
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
          onPress={() => router.push("/content-analysis")}
        >
          <Text style={styles.processButtonText}>Process Content</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => router.push("/content-analysis")}
        >
          <Upload size={20} color="#7C3AED" />
          <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
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
    color: '#374151',
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    paddingRight: 48,
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
  },
  processButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  processButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    paddingHorizontal: 16,
    color: '#6B7280',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
}); 