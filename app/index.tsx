import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { FilterBar } from "@/components/FilterBar";
import { BeerCard } from "@/components/BeerCard";

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

  return (
    <View className="flex-1 p-6 bg-gray-50">
      <FilterBar
        isSingleColumn={isSingleColumn}
        setIsSingleColumn={setIsSingleColumn}
      />

      <FlatList
        data={beers}
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
