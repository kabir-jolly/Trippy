import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Cloud, CloudRain, Sun, Thermometer, ArrowRight } from 'lucide-react-native';

export default function WeatherScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Weather</Text>
          <Text style={styles.headerSubtitle}>Barcelona, Spain</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.currentWeather}>
          <View style={styles.temperatureContainer}>
            <Sun size={56} color="#FFB800" />
            <Text style={styles.temperature}>27°</Text>
            <Text style={styles.weatherDescription}>Sunny</Text>
          </View>
          
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Thermometer size={20} color="#6B7280" />
              <Text style={styles.detailText}>Feels like: 29°</Text>
            </View>
            <View style={styles.weatherDetail}>
              <Cloud size={20} color="#6B7280" />
              <Text style={styles.detailText}>Humidity: 45%</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>5-day Forecast</Text>
        
        <View style={styles.forecastContainer}>
          <View style={styles.forecastDay}>
            <Text style={styles.forecastDate}>Wed, May 11</Text>
            <Sun size={24} color="#FFB800" />
            <Text style={styles.forecastTemp}>28°</Text>
          </View>
          
          <View style={styles.forecastDay}>
            <Text style={styles.forecastDate}>Thu, May 12</Text>
            <Cloud size={24} color="#9CA3AF" />
            <Text style={styles.forecastTemp}>25°</Text>
          </View>
          
          <View style={styles.forecastDay}>
            <Text style={styles.forecastDate}>Fri, May 13</Text>
            <CloudRain size={24} color="#6B7280" />
            <Text style={styles.forecastTemp}>22°</Text>
          </View>
          
          <View style={styles.forecastDay}>
            <Text style={styles.forecastDate}>Sat, May 14</Text>
            <Cloud size={24} color="#9CA3AF" />
            <Text style={styles.forecastTemp}>24°</Text>
          </View>
          
          <View style={styles.forecastDay}>
            <Text style={styles.forecastDate}>Sun, May 15</Text>
            <Sun size={24} color="#FFB800" />
            <Text style={styles.forecastTemp}>26°</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.returnButton}
          onPress={() => router.push('/final-itinerary')}
        >
          <Text style={styles.returnButtonText}>Return to Itinerary</Text>
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
  currentWeather: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  temperatureContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 8,
  },
  weatherDescription: {
    fontSize: 18,
    color: '#6B7280',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 12,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
}); 