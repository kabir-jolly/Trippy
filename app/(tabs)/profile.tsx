import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Sample trip data - in a real app, this would come from your state management or API
const tripData = {
  destination: "Barcelona, Spain",
  startDate: "2023-10-15",
  endDate: "2023-10-22",
  currentLocation: "Sagrada Familia",
  itinerary: [
    {
      day: "Monday",
      date: "2023-10-16",
      activities: [
        { time: "9:00 AM", activity: "Breakfast at hotel" },
        { time: "10:30 AM", activity: "Visit Sagrada Familia" },
        { time: "1:00 PM", activity: "Lunch at El Nacional" },
        { time: "3:00 PM", activity: "Explore Gothic Quarter" },
        { time: "7:00 PM", activity: "Dinner at Can Culleretes" }
      ]
    },
    {
      day: "Tuesday",
      date: "2023-10-17",
      activities: [
        { time: "9:30 AM", activity: "Visit Park Güell" },
        { time: "12:30 PM", activity: "Lunch at La Boqueria Market" },
        { time: "2:30 PM", activity: "Picasso Museum" },
        { time: "5:00 PM", activity: "Shopping at Passeig de Gràcia" },
        { time: "8:00 PM", activity: "Tapas dinner tour" }
      ]
    }
  ],
  photoSpots: [
    { name: "East side stained glass", description: "Best in the morning for light through the stained glass" },
    { name: "Nativity facade", description: "Northwest corner offers the most detailed view" },
    { name: "Rooftop views", description: "Panoramic views of Barcelona from the towers" }
  ],
  weatherForecast: {
    today: { condition: "Sunny", temperature: "24°C", precipitation: "0%" },
    tomorrow: { condition: "Partly Cloudy", temperature: "22°C", precipitation: "10%" }
  }
};

// Storage key for the API key
const API_KEY_STORAGE_KEY = 'claude_api_key';

// Helper function to get current location-aware greeting
const getContextAwareGreeting = () => {
  const hours = new Date().getHours();
  const currentDate = new Date().toLocaleDateString();
  
  let greeting = "";
  if (hours < 12) greeting = "Good morning!";
  else if (hours < 18) greeting = "Good afternoon!";
  else greeting = "Good evening!";
  
  return `${greeting} Today is ${currentDate}, and you're at ${tripData.currentLocation} in ${tripData.destination}. How can I help with your trip?`;
};

// Format trip data for Claude to understand context
const prepareTripContext = () => {
  return `
Current trip information:
- Destination: ${tripData.destination}
- Current location: ${tripData.currentLocation}
- Date range: ${tripData.startDate} to ${tripData.endDate}
- Today's itinerary: ${JSON.stringify(tripData.itinerary[0].activities)}
- Tomorrow's itinerary: ${JSON.stringify(tripData.itinerary[1].activities)}
- Weather: ${JSON.stringify(tripData.weatherForecast)}
- Photo spots at current location (${tripData.currentLocation}): ${JSON.stringify(tripData.photoSpots)}

You are a helpful travel assistant. The user is currently at ${tripData.currentLocation}. 
Provide personalized, location-aware responses. If they ask about photo spots, recommend the best places to take photos at their current location.
If they ask about the itinerary, tell them about today's plan. Always be concise but helpful.
`;
};

export default function TravelAssistantScreen() {
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);
  const insets = useSafeAreaInsets();
  
  // Get theme colors based on color scheme
  const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  // Claude API Key - In a real app, this should be stored securely
  const [apiKey, setApiKey] = useState<string>("");
  const [apiKeySetMethod, setApiKeySetMethod] = useState<string>("");
  
  // Try to load API key on component mount
  useEffect(() => {
    const loadApiKey = async () => {
      try {
        const storedApiKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedApiKey) {
          setApiKey(storedApiKey);
          setApiKeySetMethod("stored");
        }
      } catch (error) {
        console.error("Error loading API key:", error);
      }
    };
    
    loadApiKey();
  }, []);
  
  // Initialize with a welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: getContextAwareGreeting(),
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Function to save API key to AsyncStorage
  const saveApiKey = async (key: string) => {
    try {
      await AsyncStorage.setItem(API_KEY_STORAGE_KEY, key);
      setApiKeySetMethod("stored");
    } catch (error) {
      console.error("Error saving API key:", error);
      Alert.alert(
        "Storage Error",
        "Unable to save your API key. It will be used for this session only."
      );
      setApiKeySetMethod("session");
    }
  };

  // Function to clear stored API key
  const clearApiKey = async () => {
    try {
      await AsyncStorage.removeItem(API_KEY_STORAGE_KEY);
      setApiKey("");
      setApiKeySetMethod("");
      
      // Add message to the chat
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: "API key has been removed from storage. You'll need to set it again the next time you use the app.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error clearing API key:", error);
    }
  };

  // Function to send message to Claude API
  const sendMessageToClaude = async (userMessage: string) => {
    if (!apiKey) {
      return "Please set your Claude API key first. You can do this by typing 'set API key: YOUR_API_KEY_HERE'";
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 1000,
          system: prepareTripContext(),
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Error calling Claude API');
      }
      
      return data.content[0].text;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      return "Sorry, I encountered an error communicating with my brain. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;
    
    // Handle API key commands
    if (inputText.toLowerCase().startsWith("set api key:")) {
      const key = inputText.substring(12).trim();
      setApiKey(key);
      
      // Show confirmation dialog for saving API key
      Alert.alert(
        "Save API Key",
        "Would you like to save your API key for future sessions?",
        [
          {
            text: "Yes, Save Securely",
            onPress: () => saveApiKey(key),
          },
          {
            text: "No, Use for This Session Only",
            onPress: () => setApiKeySetMethod("session"),
            style: "cancel",
          },
        ]
      );
      
      // Add user message (hiding the actual key)
      const userMessage: Message = {
        id: Date.now().toString(),
        text: "Set API Key: [hidden for security]",
        isUser: true,
        timestamp: new Date(),
      };
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "API key has been set successfully. I'm now ready to assist you with your trip!",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage, assistantMessage]);
      setInputText("");
      return;
    } else if (inputText.toLowerCase() === "clear api key") {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: "Clear API Key",
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputText("");
      
      // Clear the API key
      clearApiKey();
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText("");
    
    // Get Claude's response
    let response;
    
    if (apiKey) {
      response = await sendMessageToClaude(inputText);
    } else {
      // Fallback to mock responses if no API key is set
      if (inputText.toLowerCase().includes("weather")) {
        response = `The weather at ${tripData.currentLocation} today is ${tripData.weatherForecast.today.condition} with a temperature of ${tripData.weatherForecast.today.temperature}.`;
      } else if (inputText.toLowerCase().includes("restaurant") || inputText.toLowerCase().includes("food")) {
        response = `There are several great restaurants near ${tripData.currentLocation}. I recommend trying El Nacional for lunch, it's on your itinerary today.`;
      } else if (inputText.toLowerCase().includes("itinerary") || inputText.toLowerCase().includes("schedule")) {
        const todayActivities = tripData.itinerary[0].activities.map(act => `- ${act.time}: ${act.activity}`).join('\n');
        response = `Your itinerary for today includes:\n${todayActivities}`;
      } else if (inputText.toLowerCase().includes("photo") || inputText.toLowerCase().includes("picture")) {
        const photoInfo = tripData.photoSpots.map(spot => `- ${spot.name}: ${spot.description}`).join('\n');
        response = `Best photo spots at ${tripData.currentLocation}:\n${photoInfo}`;
      } else {
        response = `I'm your travel assistant for ${tripData.destination}. I can help with local recommendations, photo spots, weather updates, and your itinerary. Set my API key to enable my full capabilities.`;
      }
    }
    
    // Add assistant response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View 
        style={[
          styles.messageContainer,
          item.isUser ? styles.userMessage : styles.assistantMessage,
          { 
            backgroundColor: item.isUser 
              ? themeColors.tint
              : colorScheme === 'light' ? '#F0F0F0' : '#333' 
          }
        ]}
      >
        <Text style={[
          item.isUser ? styles.userMessageText : styles.assistantMessageText, 
          { color: item.isUser ? 'white' : themeColors.text }
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  // Get appropriate API key status message
  const getApiKeyStatusMessage = () => {
    if (!apiKey) {
      return "To enable AI responses, type 'set API key: YOUR_API_KEY_HERE'";
    } else if (apiKeySetMethod === "stored") {
      return "Using stored API key. Type 'clear API key' to remove it.";
    } else if (apiKeySetMethod === "session") {
      return "Using API key for this session only.";
    }
    return "";
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.container,
        { backgroundColor: themeColors.background }
      ]}
      keyboardVerticalOffset={100}
    >
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top : 16 }]}>
        <Text style={[
          styles.title,
          { color: themeColors.text }
        ]}>
          Claude's Travel Assistant
        </Text>
        <Text style={styles.subtitle}>
          {getApiKeyStatusMessage()}
        </Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
      />
      
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: colorScheme === 'light' ? '#F0F0F0' : '#333',
          borderColor: themeColors.border,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10
        }
      ]}>
        <TextInput
          style={[
            styles.input,
            { color: themeColors.text }
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about your trip..."
          placeholderTextColor={colorScheme === 'light' ? '#888' : '#AAA'}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          editable={!isLoading}
        />
        {isLoading ? (
          <View style={[styles.loadingContainer, { backgroundColor: themeColors.tint }]}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.loadingText}>
              Claude is thinking...
            </Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={[
              styles.sendButton,
              { backgroundColor: themeColors.tint }
            ]}
            onPress={handleSend}
            disabled={isLoading}
          >
            <IconSymbol name="paperplane.fill" size={20} color="white" weight="medium" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#1F2937",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    maxWidth: "80%",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: "80%",
  },
  userMessageText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 22,
  },
  assistantMessageText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  apiKeyNotice: {
    padding: 16,
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    marginVertical: 16,
  },
  apiKeyNoticeText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  apiKeyBold: {
    fontWeight: "bold",
  },
  apiKeyCommandContainer: {
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  apiKeyCommand: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    color: "#92400E",
  },
});
