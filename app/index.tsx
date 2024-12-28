import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { FilterBar } from "@/components/FilterBar";
import { BeerCard } from "@/components/BeerCard";
import { Text } from "@/components/Text";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Beer = {
  id: number;
  name: string;
  alcohol: string;
  price?: string;
  rating: number;
  image: string;
};

export default function Index() {
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const [data, setData] = useState<Beer[]>([]);
  const [filteredData, setFilteredData] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortState, setSortState] = useState<{
    sortBy: "price" | "rating" | null;
    order: "asc" | "desc";
  }>({ sortBy: null, order: "asc" });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://192.168.1.203:4000/beers";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }

        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue s'est produite");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      return { sortBy, order: newOrder as "asc" | "desc" };
    });
  };

  if (loading) {
    return <Text className="text-red-400">Loading...</Text>;
  }

  if (error) {
    return <Text className="text-red-400">{error}</Text>;
  }

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
              <BeerCard
                id={item.id}
                name={item.name}
                alcohol={item.alcohol}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            </View>
          )}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.push("/add-beer")}
        className="absolute bottom-8 right-8 z-auto"
      >
        <Ionicons name={"add-circle"} size={70} color="#1f2937" />
      </TouchableOpacity>
    </>
  );
}
