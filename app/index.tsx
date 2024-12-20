import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FilterBar } from "@/components/FilterBar";
import { BeerCard } from "@/components/BeerCard";
import { Text } from "@/components/Text";

export default function Index() {
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://10.31.37.196:4000/beers";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }

        const result = await response.json();
        setData(result);
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text className="text-red-400">Erreur : {error}</Text>;
  }

  return (
    <View className="flex-1 p-6 bg-gray-50">
      <FilterBar
        isSingleColumn={isSingleColumn}
        setIsSingleColumn={setIsSingleColumn}
      />

      <FlatList
        data={data}
        key={isSingleColumn ? "one-column" : "two-columns"}
        keyExtractor={(item) => item.id}
        numColumns={isSingleColumn ? 1 : 2}
        renderItem={({ item }) => (
          <View className={isSingleColumn ? "w-full" : "w-1/2 p-2"}>
            <BeerCard
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
  );
}
