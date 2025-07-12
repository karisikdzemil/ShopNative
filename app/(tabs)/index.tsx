import AutoScrollSlider from "@/components/AutoScrollSlider";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";


export default function Index() {
  const [commerce, setCommerce] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setCommerce(data));
  }, []);

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="bg-[#1C1C1E] mt-20 flex-row justify-between items-center p-5">
        <View className="flex-col gap-2">
          <Text className="text-xl text-gray-400">Good Morning,</Text>
          <Text className="text-2xl font-bold text-white">[USERNAME]</Text>
        </View>
        <View className="flex-row gap-5">
          <Feather
            name="search"
            size={32}
            color="white"
            className="p-2 bg-[#2f2e2e] rounded-xl"
          />
          <Feather
            name="bell"
            size={32}
            color="white"
            className="p-2 bg-[#2f2e2e] rounded-xl"
          />
        </View>
      </View>
      <AutoScrollSlider />
    </View>
  );
}