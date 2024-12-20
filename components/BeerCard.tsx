import React from "react";
import { View, Image } from "react-native";
import { Text } from "./Text";
import { Ionicons } from "@expo/vector-icons";

type BeerCardProps = {
  name: string;
  alcohol: string;
  price?: string;
  rating: number;
  image: string;
};

export const BeerCard: React.FC<BeerCardProps> = ({
  name,
  alcohol,
  price,
  rating,
  image,
}) => {
  return (
    <View className="rounded-lg bg-white shadow-md overflow-hidden w-full max-w-sm">
      <Image
        source={{ uri: image }}
        className="w-full h-40 object-cover"
        alt={name}
      />

      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{alcohol} %</Text>

        {price && (
          <Text className="text-sm text-gray-600 mt-1">{price} €</Text>
        )}

        <View className="flex-row items-center mt-3">
          <Text className="text-xl font-bold text-gray-600">{rating}</Text>
          <Ionicons name={"star"} size={20} color="#FFD700" className="ml-1" />
        </View>
      </View>
    </View>
  );
};