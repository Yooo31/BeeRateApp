import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function AddBeer() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "L'accès à la caméra est nécessaire pour prendre une photo."
        );
      }
    })();
  }, []);

  const handlePickImage = () => {
    Alert.alert("Ajouter une photo", "Choisissez une option", [
      { text: "Prendre une photo", onPress: pickFromCamera },
      { text: "Choisir depuis la galerie", onPress: pickFromGallery },
      { text: "Annuler", style: "cancel" },
    ]);
  };

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!name || !alcohol || !rating) {
      Alert.alert("Erreur", "Les champs obligatoires doivent être remplis.");
      return;
    }

    if (Number(rating) > 10) {
      Alert.alert("Erreur", "Le rating ne peut pas dépasser 10.");
      return;
    }

    const beerData = {
      name,
      alcohol,
      price: price || null,
      rating
    };

    try {
      const response = await fetch("http://192.168.1.203:4000/beers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beerData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      Alert.alert("Succès", "La bière a été ajoutée !");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la bière :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi des données.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-6 bg-gray-50">
          <Text className="text-xl font-bold mb-4 text-gray-800">Ajouter une bière</Text>

          <TouchableOpacity
            onPress={handlePickImage}
            className="h-40 bg-gray-200 rounded-lg items-center justify-center mb-4 w-full"
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
                className="w-full h-full rounded-lg"
                style={{ resizeMode: "cover" }}
              />
            ) : (
              <Text className="text-gray-500">Ajouter une photo (facultatif)</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Nom de la bière *"
            placeholderTextColor="#888888"
            value={name}
            onChangeText={setName}
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          <TextInput
            placeholder="Degré d'alcool (%) *"
            placeholderTextColor="#888888"
            value={alcohol}
            onChangeText={setAlcohol}
            keyboardType="numeric"
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          <TextInput
            placeholder="Prix (€)"
            placeholderTextColor="#888888"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          <TextInput
            placeholder="Note (max 10) *"
            placeholderTextColor="#888888"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          <View className="flex-row justify-between mt-4 w-full">
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="h-12 bg-gray-300 rounded-lg items-center justify-center flex-1 mr-2"
            >
              <Text className="text-gray-700 font-bold text-lg">Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="h-12 bg-gray-800 rounded-lg items-center justify-center flex-1 ml-2"
            >
              <Text className="text-white font-bold text-lg">Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
