import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { FilterBar } from "@/components/FilterBar";
import { BeerCard } from "@/components/BeerCard";
import { Text } from "@/components/Text";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const beers = [
  {
    id: "1",
    name: "Pale Ale",
    alcohol: "5.5",
    price: "3.50",
    rating: 4,
    image:
      "https://www.vandb.fr/media/cache/attachment/filter/vandb_b2c_product_gallery_main/3a22818443086ba533d3a730ffa7d18b/895374/67627e2e62809566376760.png",
  },
  {
    id: "2",
    name: "IPA",
    alcohol: "6.8",
    rating: 5,
    image:
      "https://www.vandb.fr/media/cache/attachment/filter/vandb_b2c_product_gallery_main/3a22818443086ba533d3a730ffa7d18b/895374/67627e2e62809566376760.png",
  },
  {
    id: "3",
    name: "Stout",
    alcohol: "4.2",
    price: "4.00",
    rating: 3,
    image:
      "https://www.vandb.fr/media/cache/attachment/filter/vandb_b2c_product_gallery_main/3a22818443086ba533d3a730ffa7d18b/895374/67627e2e62809566376760.png",
  },
  {
    id: "4",
    name: "Lager",
    alcohol: "5.0",
    rating: 4,
    image:
      "https://www.vandb.fr/media/cache/attachment/filter/vandb_b2c_product_gallery_main/3a22818443086ba533d3a730ffa7d18b/895374/67627e2e62809566376760.png",
  },
];

export default function Index() {
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const router = useRouter();
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
                image={"https://www.vandb.fr/media/cache/attachment/filter/vandb_b2c_product_gallery_main/3a22818443086ba533d3a730ffa7d18b/895374/67627e2e62809566376760.png"}
              />
            </View>
          )}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        />
      </View>

      <TouchableOpacity
        onPress={() => (router.push as (url: string) => void)("/add-beer")}
        className="absolute bottom-8 right-8 z-auto"
      >
        <Ionicons name={"add-circle"} size={70} color="#1f2937" />
      </TouchableOpacity>
      </>
  );
}
