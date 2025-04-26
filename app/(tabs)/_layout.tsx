import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Beautiful aesthetic blue color
const AESTHETIC_BLUE = "#4A86E8";
// Light gray color for inactive labels
const LIGHT_GRAY = "#9E9E9E";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: AESTHETIC_BLUE,
        tabBarInactiveTintColor: LIGHT_GRAY,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 15,
          right: 15,
          width: undefined,
          elevation: 0,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 25,
          height: 75,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          paddingHorizontal: 20,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          marginVertical: 0,
          height: 75,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 12,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 8,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="sparkles" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
