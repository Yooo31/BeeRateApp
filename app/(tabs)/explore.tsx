import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Text } from "@/components/Text";

export default function TabTwoScreen() {
  return (
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
  );
}
