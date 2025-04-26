import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from '@/constants/Colors';
import { hasCompletedOnboarding } from '@/utils/storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkOnboarding() {
      const completed = await hasCompletedOnboarding();
      setShowOnboarding(!completed);
    }
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || showOnboarding === null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
            },
            headerTintColor: colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}>
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
          },
          headerTintColor: colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="create-trip"
          options={{
            title: "Create Trip",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="join-trip"
          options={{
            title: "Join Trip",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="content-empty"
          options={{
            title: "Add Content",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="add-content"
          options={{
            title: "Add Content",
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="content-analysis"
          options={{
            title: "AI Analysis",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="content-with-items"
          options={{
            title: "Content Collection",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="itinerary-planning"
          options={{
            title: "Itinerary Planning",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="final-itinerary"
          options={{
            title: "Your Itinerary",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="trip-details"
          options={{
            title: "Trip Details",
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
