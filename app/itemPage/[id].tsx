import { RootState } from "@/redux/store";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const colors = ["black", "white", "red", "blue"];
const sizes = ["7", "8", "9", "10", "11", "12"];

export default function ItemPage() {
    const [color, setColor] = useState<string | null>(null);
    const [size, setSize] = useState<string | null>(null)
  const { id } = useLocalSearchParams();
  const { items, loading } = useSelector((state: RootState) => state.products);

  const product = !loading
    ? items.find((el) => String(el.id) === String(id))
    : null;

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "#121212",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={{
          backgroundColor: "#121212",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView
        className="w-full pt-14 pb-14"
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
      >
        <Image
          source={{ uri: product.image }}
          resizeMode="cover"
          className="w-full h-[500px] rounded-xl"
        />

        <View className="p-5">
          <Image
            source={{ uri: product.image }}
            resizeMode="cover"
            className="w-16 h-16 rounded-xl mt-5"
          />

          <Text className="text-white font-bold text-3xl mt-5">
            {product.title}
          </Text>
          <Text className="text-xl text-gray-400 mt-2">{product.category}</Text>
          <Text className="mt-2 text-gray-400 flex-row items-center">
            <FontAwesome name="star" size={17} color="yellow" />{" "}
            {product.rating.rate} ({product.rating.count} reviews)
          </Text>

          <View className="flex-row gap-3">
            <Text className="text-4xl text-white font-bold mt-5">
              ${product.price}
            </Text>
            <Text className="text-2xl text-gray-400 font-bold mt-5 line-through">
              ${product.price + 20}
            </Text>
          </View>

          <Text className="text-gray-400 mt-5">{product.description}</Text>
        </View>

       {(product.category === "men's clothing" || product.category === "women's clothing") && <View>
        <Text className="ml-6 m-2 text-2xl text-white font-bold">Colors</Text>
       <View className="flex-row gap-3 mb-3 items-center justify-center mt-5">
         {colors.map((el, i) => (
            <TouchableOpacity onPress={() => setColor(el)} key={i} className={`w-24 rounded-2xl py-3 ${el === color ? "bg-[#FF5C00]" : "bg-[#1C1C1E]"}`}>
                <Text className={` text-center ${el === color ? "text-white" : "text-gray-400"}`}>{el}</Text>
            </TouchableOpacity>
        ))}
       </View>
        <Text className="ml-6 m-2 text-2xl text-white font-bold">Size</Text>
        <View className="flex-row mb-3 gap-3 items-center justify-center mt-5">
         {sizes.map((el, i) => (
            <TouchableOpacity onPress={() => setSize(el)} key={i} className={`w-14 rounded-2xl py-3 ${el === size ? "bg-[#FF5C00]" : "bg-[#1C1C1E]"}`}>
                <Text className={` text-center ${el === size ? "text-white" : "text-gray-400"}`}>{el}</Text>
            </TouchableOpacity>
        ))}
       </View>
       </View>}
      </ScrollView>
      <View className="bg-[#1C1C1E] items-center gap-5 justify-center flex-row h-28">
        <View className="w-14 h-14 rounded-md bg-gray-600 items-center justify-center">
            <Feather name="shopping-cart" size={30} color="black" />
        </View>
          <TouchableOpacity className="w-[70%] h-14 py-3 rounded-lg bg-[#FF5C00]">
          <Text className="text-white text-center text-2xl font-bold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
