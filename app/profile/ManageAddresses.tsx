import { useNavigation } from "@react-navigation/native";
// import { ArrowLeft } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ManageAddresses() {
  const navigation = useNavigation();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleSave = () => {
    if (!address.street || !address.city || !address.postalCode || !address.country) {
      Alert.alert("Missing fields", "Please fill in all address fields.");
      return;
    }
    Alert.alert("Address Saved", "Your address has been saved successfully!");
    // Ovde bi inače slao na backend ili u redux  
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#121212]">
      <View className="py-20 bg-[#1C1C1E] relative">
         <TouchableOpacity className="absolute top-20 left-5" onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mx-auto">Manage Addresses</Text>
      </View>

      <View className="gap-5 mt-5 p-5">
        <TextInput
          placeholder="Street"
          placeholderTextColor="#aaa"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
          className="bg-[#1C1C1E] text-white p-4 rounded-xl"
        />
        <TextInput
          placeholder="City"
          placeholderTextColor="#aaa"
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
          className="bg-[#1C1C1E] text-white p-4 rounded-xl"
        />
        <TextInput
          placeholder="Postal Code"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={address.postalCode}
          onChangeText={(text) => setAddress({ ...address, postalCode: text })}
          className="bg-[#1C1C1E] text-white p-4 rounded-xl"
        />
        <TextInput
          placeholder="Country"
          placeholderTextColor="#aaa"
          value={address.country}
          onChangeText={(text) => setAddress({ ...address, country: text })}
          className="bg-[#1C1C1E] text-white p-4 rounded-xl"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="mt-10 bg-[#FF5C00] w-[90%] p-4 mx-auto rounded-xl items-center"
      >
        <Text className="text-white font-bold text-lg">Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
