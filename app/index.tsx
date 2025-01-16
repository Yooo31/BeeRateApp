import React, { useState, useEffect } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { FilterBar } from "@/components/FilterBar";
import { BeerCard } from "@/components/BeerCard";
import { BeerModal } from "@/components/BeerModal";
import { Text } from "@/components/Text";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBeers } from "@/hooks/useBeers";
import { SortState } from "@/types/common";
import { Beer } from "@/types/beer";
import HomeSkeleton from "@/components/Skeleton/HomeSkeleton";

export default function Index() {
  const { data, loading, error } = useBeers();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<Beer[]>([]);
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const [sortState, setSortState] = useState<SortState>({ sortBy: null, order: "asc" });
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSortChange = (sortBy: "price" | "rating") => {
    setSortState((prev) => {
      const isSameSort = prev.sortBy === sortBy;
      const newOrder = isSameSort && prev.order === "asc" ? "desc" : "asc";

      const sortedData = [...data].sort((a, b) => {
        const valueA = sortBy === "price" ? parseFloat(a.price || "0") : a.rating;
        const valueB = sortBy === "price" ? parseFloat(b.price || "0") : b.rating;
        return newOrder === "asc" ? valueA - valueB : valueB - valueA;
      });

      setFilteredData(sortedData);
      return { sortBy, order: newOrder };
    });
  };

  const openModal = (beer: Beer) => {
    setSelectedBeer(beer);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedBeer(null);
    setIsModalVisible(false);
  };

  if (loading) return <HomeSkeleton/>;
  if (error) return <Text className="text-red-400">{error}</Text>;

  return (
    <>
      <View className="flex-1 p-6 bg-gray-50">
        <FilterBar
          isSingleColumn={isSingleColumn}
          setIsSingleColumn={setIsSingleColumn}
          sortState={sortState}
          onSortChange={handleSortChange}
        />
        <FlatList
          data={filteredData}
          key={isSingleColumn ? "one-column" : "two-columns"}
          keyExtractor={(item) => item.id.toString()}
          numColumns={isSingleColumn ? 1 : 2}
          renderItem={({ item }) => (
            <View className={isSingleColumn ? "w-full" : "w-1/2 p-2"}>
              <BeerCard {...item} onPress={() => openModal(item)} />
            </View>
          )}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        />
      </View>

      {selectedBeer && (
        <BeerModal
          beer={selectedBeer}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      )}

      <TouchableOpacity
        onPress={() => router.push("/add-beer")}
        className="absolute bottom-8 right-8 z-auto"
      >
        <Ionicons name={"add-circle"} size={70} color="#1f2937" />
      </TouchableOpacity>
    </>
  );
}
