import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
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
          {/* Index will redirect to onboarding */}
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
            }}
          />
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
              presentation: "modal",
              animation: "slide_from_right"
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
          <Stack.Screen 
            name="+not-found" 
            options={{ 
              title: "Not Found" 
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
