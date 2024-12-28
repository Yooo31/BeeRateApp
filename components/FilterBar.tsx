import React from "react";
import { View } from "react-native";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

type SortState = {
  sortBy: "price" | "rating" | null;
  order: "asc" | "desc";
};

type FilterBarProps = {
  isSingleColumn: boolean;
  setIsSingleColumn: React.Dispatch<React.SetStateAction<boolean>>;
  sortState: {
    sortBy: "price" | "rating" | null;
    order: "asc" | "desc";
  };
  onSortChange: (sortBy: "price" | "rating", order: "asc" | "desc") => void;
};

export const FilterBar: React.FC<FilterBarProps> = ({
  isSingleColumn,
  setIsSingleColumn,
  sortState,
  onSortChange,
}) => {
  const handleSortByPrice = () => {
    onSortChange("price", "asc");
  };

  const handleSortByRating = () => {
    onSortChange("rating", "desc");
  };

  console.log(sortState);
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
        <Button variant="link" onPress={handleSortByPrice}>
        {sortState.order === "asc" && sortState.sortBy === "price" ? (
          <Ionicons
            name={"cash"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        ) : (
          <Ionicons
            name={"cash-outline"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        )}
        </Button>
        <Button variant="link" onPress={handleSortByRating}>
        {sortState.order === "asc" && sortState.sortBy === "rating" ? (
          <Ionicons
            name={"star"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        ) : (
          <Ionicons
            name={"star-outline"}
            size={20}
            color="#1f2937"
            className="ml-1"
          />
        )}
        </Button>
      </View>
    </View>
  );
};
