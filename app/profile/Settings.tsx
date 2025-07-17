import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-20 bg-[#1C1C1E] relative">
            <TouchableOpacity className="absolute top-20 left-5" onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Settings
          </Text>
        </View>
        </ScrollView>
        </View>
  );
}
