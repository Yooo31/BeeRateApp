import React from "react";
import { Text, View } from "react-native";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Poppins_700Bold } from "@expo-google-fonts/poppins"; // Importer une police

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold, // Charger la police
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Attendre le chargement des polices
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold", // Appliquer la police cartoon ici
          fontSize: 48,
          color: "#FF6347", // Une couleur rouge-orange pour donner un effet cartoon
          textShadowColor: "rgba(0, 0, 0, 0.3)", // Ajouter une ombre pour l'effet cartoon
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 10,
        }}
      >
        BeeRate
      </Text>
      <Slot />
    </View>
  );
}
