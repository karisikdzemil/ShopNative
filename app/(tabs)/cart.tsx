import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function Cart() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  const proba = () => {
    console.log(user);
  };

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-20 bg-[#1C1C1E] relative">
          <TouchableOpacity
            className="absolute top-20 left-5"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Shopping Cart
          </Text>
        </View>

        <View className="p-10 items-center">
          <Feather name="shopping-bag" size={80} color="gray" />
          <Text className="text-3xl text-white font-bold p-5">
            Your Cart is Empty
          </Text>
          <Text className=" text-gray-400">
            Add some products to your cart to get started
          </Text>
          <TouchableOpacity
            onPress={proba}
            className="w-52 rounded-md mt-10 py-4 bg-[#FF5C00]"
          >
            <Text className=" text-center text-xl text-white font-bold">
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
