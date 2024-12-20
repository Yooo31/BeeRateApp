import React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Text } from "@/components/Text";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Avatar alt={""}>
            <AvatarImage
              source={{
                uri: "https://avatars.githubusercontent.com/u/66306912?v=4",
              }}
            />
            <AvatarFallback>
              <Text>UN</Text>
            </AvatarFallback>
          </Avatar>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card Content</Text>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
