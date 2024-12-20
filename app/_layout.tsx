import React from "react";
import "../global.css";
import { Text, View } from "react-native";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold"
        }}
        className="pt-12 text-gray-800 text-6xl"
      >
        BeeRate
      </Text>
      <Slot />
    </View>
  );
}

