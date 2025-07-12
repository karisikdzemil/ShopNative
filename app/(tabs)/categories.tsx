import Feather from "@expo/vector-icons/Feather";
import { FlatList, Text, TextInput, View } from "react-native";

const categories = ["All", "Man's", "Woman's", "Jewerly", "Electronics"];

export default function Categories() {
  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="pt-20 bg-[#1C1C1E]">
        <Text className="text-3xl mx-auto text-white font-bold">
          Categories
        </Text>

        <View className="w-[90%] h-12 bg-[#29292c] rounded-lg mx-auto flex-row mt-10 items-center justify-center">
          <Feather
            className="absolute z-10 left-1"
            name="search"
            size={24}
            color="gray"
          />
          <TextInput
            className="bg-[#29292c] z-0 w-full pl-12 h-[60%] text-gray-400"
            placeholder="Search products..."
            placeholderTextColor="gray"
          />
        </View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <View className="p-3 bg-[#29292c]">
                    <Text>{item}</Text>
          </View>}
        />
      </View>
    </View>
  );
}
