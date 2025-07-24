import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function TitleSee( {title}:any ) {
  return (
    <View className="flex-row items-center justify-between p-5">
      <Text className="text-2xl text-white font-bold">{title}</Text>
      <Link href="/(tabs)/categories"><Text className="text-base text-[#FF5C00]">See all</Text></Link>
    </View>
  );
}
