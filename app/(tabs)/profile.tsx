import { RootState } from "@/redux/store";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Profile() {
const user = useSelector((state: RootState) => state.user);
  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="bg-[#1C1C1E] h-[20vh] border-1 gap-5 pt-12 flex-row items-center p-5">
        <Feather
          name="user"
          size={50}
          color="white"
          className="p-2 bg-[#2f2e2e] rounded-[50%] border-1 border-[#FF5C00]"
        />
        <View>
            <Text className="text-2xl font-bold text-white">{user.fullName}</Text>
            <Text className="text-xl text-gray-400">{user.email}</Text>
        </View>
      </View>

      <View className="bg-[#1C1C1E] h-[10vh] justify-evenly mt-10 border-1 gap-5 flex-row items-center p-5">
            <View className="justify-center items-center">
                <Text className="text-3xl font-bold text-[#FF5C00]">0</Text>
                <Text className="text-gray-400">Orders</Text>
            </View>
            <View className="justify-center items-center">
                <Text className="text-3xl font-bold text-[#FF5C00]">0</Text>
                <Text className="text-gray-400">Favorites</Text>
            </View>
            <View className="justify-center items-center">
                <Text className="text-3xl font-bold text-[#FF5C00]">0</Text>
                <Text className="text-gray-400">Cart Items</Text>
            </View>
      </View>
    </View>
  );
}
