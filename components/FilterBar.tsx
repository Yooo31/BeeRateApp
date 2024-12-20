import React from "react";
import { View } from "react-native";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

type FilterBarProps = {
  isSingleColumn: boolean;
  setIsSingleColumn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterBar: React.FC<FilterBarProps> = ({ isSingleColumn, setIsSingleColumn }) => {
  return (
    <View className="w-full flex-row justify-between items-center">
      <Button variant="link" onPress={() => setIsSingleColumn((prev) => !prev)}>
        {isSingleColumn ? (
          <Ionicons
            name={"grid-outline"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        ) : (
          <Ionicons
            name={"list-outline"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        )}
      </Button>
      <View className="flex-row">
        <Button variant="link">
          <Ionicons
            name={"cash-outline"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        </Button>
        <Button variant="link">
          <Ionicons
            name={"star-outline"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        </Button>
      </View>
    </View>
  );
};
