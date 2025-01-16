import React from "react";
import { Modal, View, Image, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import { Beer } from "@/types/beer";
import { API_URL } from "@/config/api";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

type BeerModalProps = {
  beer: Beer;
  isVisible: boolean;
  onClose: () => void;
};

export const BeerModal: React.FC<BeerModalProps> = ({ beer, isVisible, onClose }) => {
  if (!beer) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
    >
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
        <View className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
          <Image
            source={{ uri: `${API_URL}/${beer.photo}` }}
            className="w-full h-80 object-cover rounded-lg"
            style={{ height: screenHeight * 0.4 }}
            alt={beer.name}
          />
          <View className="mt-4">
            <Text className="text-2xl font-bold text-gray-800">{beer.name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{beer.alcohol} %</Text>
            {beer.price && <Text className="text-sm text-gray-600 mt-1">{beer.price} €</Text>}
            <View className="flex-row items-center mt-3">
              <Text className="text-xl font-bold text-gray-600">{beer.rating}</Text>
              <Ionicons name={"star"} size={20} color="#FFD700" className="ml-1" />
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4"
          >
            <Ionicons name={"close-circle"} size={30} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
