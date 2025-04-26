import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function HelloScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Hello" }} />
      <Text style={styles.text}>Hello Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
