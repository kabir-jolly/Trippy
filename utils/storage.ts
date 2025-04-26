import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@trippy:onboarding_completed';
const TRIPS_KEY = '@trippy:user_trips';

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  created: number;
  content: TripContent[];
}

export interface TripContent {
  id: string;
  type: 'TikTok' | 'Reel';
  url: string;
  title: string;
  subtitle: string;
  location?: string;
  hours?: string;
  confidence: number;
  thumbnail?: string;
}

export async function hasCompletedOnboarding(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    return false;
  }
}

export async function setOnboardingCompleted(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error saving onboarding status:', error);
  }
}

export async function saveTrip(trip: Trip): Promise<void> {
  try {
    const existingTripsJson = await AsyncStorage.getItem(TRIPS_KEY);
    const existingTrips: Trip[] = existingTripsJson ? JSON.parse(existingTripsJson) : [];
    
    // Check if trip already exists
    const index = existingTrips.findIndex(t => t.id === trip.id);
    
    if (index >= 0) {
      // Update existing trip
      existingTrips[index] = trip;
    } else {
      // Add new trip
      existingTrips.push(trip);
    }
    
    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(existingTrips));
  } catch (error) {
    console.error('Error saving trip:', error);
  }
}

export async function getTrips(): Promise<Trip[]> {
  try {
    const tripsJson = await AsyncStorage.getItem(TRIPS_KEY);
    return tripsJson ? JSON.parse(tripsJson) : [];
  } catch (error) {
    console.error('Error retrieving trips:', error);
    return [];
  }
}

export async function getTripById(id: string): Promise<Trip | null> {
  try {
    const trips = await getTrips();
    return trips.find(trip => trip.id === id) || null;
  } catch (error) {
    console.error('Error retrieving trip:', error);
    return null;
  }
}

export async function addContentToTrip(tripId: string, content: TripContent): Promise<void> {
  try {
    const trips = await getTrips();
    const tripIndex = trips.findIndex(trip => trip.id === tripId);
    
    if (tripIndex >= 0) {
      if (!trips[tripIndex].content) {
        trips[tripIndex].content = [];
      }
      
      trips[tripIndex].content.push(content);
      await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    }
  } catch (error) {
    console.error('Error adding content to trip:', error);
  }
}

export async function deleteTrip(id: string): Promise<void> {
  try {
    const trips = await getTrips();
    const filteredTrips = trips.filter(trip => trip.id !== id);
    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(filteredTrips));
  } catch (error) {
    console.error('Error deleting trip:', error);
  }
} 