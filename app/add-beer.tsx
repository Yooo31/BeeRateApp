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
import { API_URL } from "@/config/api";

export default function AddBeer() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [alcohol, setAlcohol] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Request camera permissions
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

  // Handle image selection
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

  // Handle form submission
  const handleSubmit = async () => {
    Keyboard.dismiss();

    // Validation des champs obligatoires
    if (!name || !alcohol || !rating) {
      Alert.alert("Erreur", "Les champs obligatoires doivent être remplis.");
      return;
    }

    if (Number(rating) > 10) {
      Alert.alert("Erreur", "Le rating ne peut pas dépasser 10.");
      return;
    }

    // Préparation des données pour la requête
    const formData = new FormData();
    formData.append("name", name);
    formData.append("alcohol", alcohol);
    formData.append("price", price || "");
    formData.append("rating", rating);

    if (photo) {
      formData.append("photo", {
        uri: photo,
        name: `photo_${Date.now()}.jpg`, // Nom du fichier
        type: "image/jpeg", // Type MIME
      });
    }

    try {
      const response = await fetch(`${API_URL}/add/beer`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      Alert.alert("Succès", "La bière a été ajoutée !");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la bière :", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'envoi des données."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-6 bg-gray-50">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            Ajouter une bière
          </Text>

          {/* Photo input */}
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
              <Text className="text-gray-500">
                Ajouter une photo (facultatif)
              </Text>
            )}
          </TouchableOpacity>

          {/* Name input */}
          <TextInput
            placeholder="Nom de la bière *"
            placeholderTextColor="#888888"
            value={name}
            onChangeText={setName}
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          {/* Alcohol input */}
          <TextInput
            placeholder="Degré d'alcool (%) *"
            placeholderTextColor="#888888"
            value={alcohol}
            onChangeText={setAlcohol}
            keyboardType="numeric"
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          {/* Price input */}
          <TextInput
            placeholder="Prix (€)"
            placeholderTextColor="#888888"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          {/* Rating input */}
          <TextInput
            placeholder="Note (max 10) *"
            placeholderTextColor="#888888"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            className="h-12 border border-gray-300 rounded-lg px-4 mb-4 w-full"
          />

          {/* Buttons */}
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
