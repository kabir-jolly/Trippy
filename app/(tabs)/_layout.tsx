import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
        tabBarStyle: {
          backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
          borderTopColor: colorScheme === 'light' ? Colors.light.border : Colors.dark.border,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
        },
        headerTintColor: colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house" size={size} color={color} weight="medium" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="magnifyingglass" size={size} color={color} weight="medium" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="person" size={size} color={color} weight="medium" />
          ),
        }}
      />
    </Tabs>
  );
}
