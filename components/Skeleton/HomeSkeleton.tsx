import React from "react";
import { View } from "react-native";
import { Skeleton } from "@/components/Skeleton";

export default function HomeSkeleton() {
  return (
    <View className="flex-1 p-4 bg-gray-100 w-full">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Skeleton className="h-8 w-32 rounded"/>
        <View className="flex-row space-x-4">
          <Skeleton className="h-6 w-6 rounded"/>
          <Skeleton className="h-6 w-6 rounded"/>
          <Skeleton className="h-6 w-6 rounded"/>
        </View>
      </View>

      <View className="space-y-6 items-center">
        <View className="w-3/4 p-4 bg-white rounded-lg border border-gray-200 shadow">
          <Skeleton className="h-36 w-full rounded mb-4"/>
          <Skeleton className="h-6 w-24 mb-2 rounded"/>
          <Skeleton className="h-4 w-12 mb-2 rounded"/>
          <Skeleton className="h-4 w-16 mb-4 rounded"/>
          <Skeleton className="h-4 w-8 rounded"/>
        </View>
      </View>

      <View className="absolute bottom-4 right-4">
        <Skeleton className="h-12 w-12 rounded-full"/>
      </View>
    </View>
  );
}
