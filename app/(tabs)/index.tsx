import CategoryCard from "@/components/CategoryCard";
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
    <View className="bg-[#121212] w-full h-full">
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
      <View >
          <View className="flex-row items-center justify-between p-3 pt-5">
            <Text className="text-2xl text-white font-bold">Categories</Text>
            <Text className="text-base text-[#FF5C00]">See all</Text>
          </View>
          <CategoryCard />
      </View>
      <View>
        {/* <FlatList
          data={commerce}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <View className="text-white">
              <Text className="text-white">Category: {item.category}</Text>
              <Text className="text-white">Deskription: {item.description}</Text>
              <Text className="text-white">ID:{item.id}</Text>
              <Image  source={{ uri: item.image }} resizeMode="contain" style={{ width: 200, height: 200 }}/>
              <Text className="text-white">Price: {item.price}</Text>
              <Text className="text-white">Rating: {item.rating.count}, {item.rating.rate}</Text>
              <Text className="text-white">title:{ item.title}</Text>
              <Text className="text-white">----------------------------------------------------</Text>
          </View>}
        /> */}
      </View>
    </View>
  );
}
