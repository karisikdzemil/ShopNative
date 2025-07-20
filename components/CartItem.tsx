import { RootState } from "@/redux/store";
import Feather from "@expo/vector-icons/Feather";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
;

export default function CartItem ( {id} ) {
    const {items: products, loading, error} = useSelector((state: RootState) => state.products);
    const targetItem = products.find((el) => el.id === id);
    console.log(targetItem)
    return(
        <View className="bg-[#1C1C1E] mx-5 my-3 p-5 gap-10 flex-row relative">
        <Image
        className="rounded-xl"
        source={{ uri: targetItem.image }}  
        resizeMode="cover"
        style={{ width: "70", height: "70", zIndex: 1 }}
      />
      <View className="flex-col items-start">
        <Text className="text-white font-bold w-52 line-clamp-1 text-xl">{targetItem.title}</Text>
        <View className="flex-row mt-2 items-center justify-center gap-3">
            <Text className="text-gray-400">Size: </Text>
            <Text className="text-gray-400">Size: </Text>
        </View>
        <Text className="text-white font-bold text-xl mt-2">{targetItem.price}</Text>
        <View>
            <View className="flex-row items-center justify-center mt-2 gap-5">
                <TouchableOpacity>
                <Text className="p-3 rounded-md text-xl bg-slate-800 text-gray-400">-</Text>
                </TouchableOpacity>
                <Text className="text-white text-2xl">0</Text>
                <TouchableOpacity>
                <Text className="p-3 text-xl rounded-md bg-slate-800 text-gray-400">+</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <TouchableOpacity className="absolute right-3 top-3">
        <Feather name="trash-2" size={24} color="red" />
      </TouchableOpacity>
        </View>
    )
}