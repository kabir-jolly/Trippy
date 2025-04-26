import React from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Popular destination data
const popularDestinations = [
  { id: '1', name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=300&auto=format&fit=crop' },
  { id: '2', name: 'Tokyo', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=300&auto=format&fit=crop' },
  { id: '3', name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=300&auto=format&fit=crop' },
  { id: '4', name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=300&auto=format&fit=crop' },
];

// Categories data
const categories = [
  { id: '1', name: 'Beach', icon: 'umbrella' },
  { id: '2', name: 'Mountain', icon: 'mountain.2' },
  { id: '3', name: 'Urban', icon: 'building.2' },
  { id: '4', name: 'Historic', icon: 'building.columns' },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const DestinationCard = ({ item }: { item: typeof popularDestinations[0] }) => (
    <TouchableOpacity style={styles.destinationCard}>
      <Image source={{ uri: item.image }} style={styles.destinationImage} />
      <View style={[styles.destinationNameContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.destinationName, { color: colors.text }]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const CategoryButton = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity 
      style={[styles.categoryButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
    >
      <View style={[styles.categoryIconContainer, { backgroundColor: `${colors.primary}20` }]}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.primary} weight="medium" />
      </View>
      <Text style={[styles.categoryName, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.background,
        paddingTop: insets.top + 8,
      }
    ]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Discover</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Explore destinations for your next adventure
          </Text>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.muted} weight="medium" />
            <TextInput
              placeholder="Search destinations, activities, etc."
              placeholderTextColor={colors.muted}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
        </View>
        
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map(item => (
              <CategoryButton key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.popularContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Destinations</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
            {popularDestinations.map(item => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.inspireContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Get Inspired</Text>
          <TouchableOpacity 
            style={[styles.inspireCard, { backgroundColor: colors.primary }]}
          >
            <View style={styles.inspireContent}>
              <Text style={styles.inspireTitle}>Summer Getaways</Text>
              <Text style={styles.inspireSubtitle}>Discover the best beach destinations</Text>
              <View style={styles.inspireButton}>
                <Text style={styles.inspireButtonText}>Explore</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginRight: 12,
    width: 100,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  popularContainer: {
    marginBottom: 24,
  },
  popularScroll: {
    flexDirection: 'row',
  },
  destinationCard: {
    width: 180,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  inspireContainer: {
    marginBottom: 24,
  },
  inspireCard: {
    borderRadius: 16,
    padding: 24,
    height: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inspireContent: {
    maxWidth: '60%',
  },
  inspireTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inspireSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
  },
  inspireButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  inspireButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
});
