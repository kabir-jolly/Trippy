import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Calendar } from 'lucide-react-native';

export default function CreateTripScreen() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.dark.background;
  
  const [tripName, setTripName] = useState('Barcelona Adventure');
  const [destination, setDestination] = useState('Barcelona, Spain');
  const [startDate, setStartDate] = useState('May 10, 2025');
  const [endDate, setEndDate] = useState('May 15, 2025');
  const [travelers, setTravelers] = useState('3');

  const handleCreateTrip = () => {
    router.push('/content-empty');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Create New Trip</Text>
        <Text style={styles.subtitle}>
          Fill in the details to get started with your trip planning
        </Text>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Trip Name</Text>
          <TextInput 
            style={styles.input}
            value={tripName}
            onChangeText={setTripName}
            placeholder="e.g., Barcelona Adventure"
          />
        </View>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Destination</Text>
          <TextInput 
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
            placeholder="e.g., Barcelona, Spain"
          />
        </View>
        
        <View style={styles.formRow}>
          <View style={[styles.formFieldHalf, { marginRight: 8 }]}>
            <Text style={styles.label}>Start Date</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>{startDate}</Text>
              <Calendar size={18} color="#7C3AED" />
            </View>
          </View>
          
          <View style={styles.formFieldHalf}>
            <Text style={styles.label}>End Date</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>{endDate}</Text>
              <Calendar size={18} color="#7C3AED" />
            </View>
          </View>
        </View>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Number of Travelers</Text>
          <TextInput 
            style={styles.input}
            value={travelers}
            onChangeText={setTravelers}
            placeholder="e.g., 2"
            keyboardType="numeric"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateTrip}
        >
          <Text style={styles.createButtonText}>Create Trip</Text>
        </TouchableOpacity>
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
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  formField: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formFieldHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#111827',
  },
  createButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 