import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

const GITHUB_AVATAR_URI = 'https://media.istockphoto.com/id/1142192548/fr/vectoriel/profil-davatar-de-lhomme-silhouette-de-visage-m%C3%A2le-ou-ic%C3%B4ne-disolement-sur-le-fond.jpg?s=612x612&w=0&k=20&c=Fe6gJZnL9Lgli0B7cwhJEjG6vKMn-2tHKqSCvG1GHjw=';

export default function HomeScreen() {
  return (
    <Avatar alt="Zach Nugent's Avatar">
      <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
      <AvatarFallback>
        <Text>ZN</Text>
      </AvatarFallback>
    </Avatar>
  );
}
