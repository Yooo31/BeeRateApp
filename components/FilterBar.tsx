import React from "react";
import { View } from "react-native";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { SortState } from "@/types/common";

type FilterBarProps = {
  isSingleColumn: boolean;
  setIsSingleColumn: React.Dispatch<React.SetStateAction<boolean>>;
  sortState: SortState;
  onSortChange: (sortBy: "price" | "rating") => void;
};

export const FilterBar: React.FC<FilterBarProps> = ({
  isSingleColumn,
  setIsSingleColumn,
  sortState,
  onSortChange,
}) => {
  const handleSortByPrice = () => onSortChange("price");
  const handleSortByRating = () => onSortChange("rating");

  return (
    <View className="w-full flex-row justify-between items-center">
      <Button variant="link" onPress={() => setIsSingleColumn((prev) => !prev)}>
        <Ionicons
          name={isSingleColumn ? "grid-outline" : "list-outline"}
          size={20}
          color="#1f2937"
          className="ml-1"
        />
      </Button>

      <View className="flex-row">
        <Button variant="link" onPress={handleSortByPrice}>
          <Ionicons
            name={
              sortState.sortBy === "price" && sortState.order === "asc"
                ? "cash"
                : "cash-outline"
            }
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        </Button>
        <Button variant="link" onPress={handleSortByRating}>
          <Ionicons
            name={
              sortState.sortBy === "rating" && sortState.order === "asc"
                ? "star"
                : "star-outline"
            }
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        </Button>
      </View>
    </View>
  );
};
