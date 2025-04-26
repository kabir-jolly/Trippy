import { Tabs, router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 88,
          paddingBottom: Platform.OS === 'ios' ? 28 : 16,
          paddingTop: 12,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house" size={24} color={color} weight="medium" />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          listeners: {
            tabPress: (e) => {
              e.preventDefault();
              router.navigate("/(tabs)/");
            },
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="magnifyingglass" size={24} color={color} weight="medium" />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Assistant",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="message.fill" size={24} color={color} weight="medium" />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      />
      <Tabs.Screen
        name="content-analysis"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="content-with-items"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="create-trip"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="final-itinerary"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="itinerary-planning"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="add-travel-content"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="content-empty"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
