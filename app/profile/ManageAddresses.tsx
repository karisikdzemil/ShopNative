import { db } from "@/FirebaseConfig";
import { addAddress, Address } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ManageAddresses() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });


  const handleSave = async () => {
    const { street, city, postalCode, country } = address;

    if (!street || !city || !postalCode || !country) {
      Alert.alert("Missing fields", "Please fill in all address fields.");
      return;
    }

    if (!user.uid) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    try {
      setLoading(true)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        addresses: arrayUnion(address),
      });

      dispatch(addAddress(address));

      Alert.alert("Success", "Your address has been saved successfully!");

      setAddress({ street: "", city: "", postalCode: "", country: "" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error saving address:", error);
      Alert.alert("Error", "Failed to save address.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#121212]"
    >
      <View className="py-20 bg-[#1C1C1E] relative">
        <TouchableOpacity
          className="absolute top-20 left-5"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mx-auto">
          Manage Addresses
        </Text>
      </View>

      {user.address && !Array.isArray(user.address) && (
        <View className="bg-gray-400 mx-5 rounded-2xl p-5 shadow-md mt-5">
          <Text className="text-lg font-semibold mb-2">Your address</Text>
          <Text className="text-base text-gray-700">{user.address.street}</Text>
          <Text className="text-base text-gray-700">
            {user.address.city}, {user.address.postalCode} 
          </Text>
          <Text className="text-base text-gray-700">
            {user.address.country}
          </Text>
        </View>
      )}

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
        disabled={loading}
        className="mt-10 bg-[#FF5C00] w-[90%] p-4 mx-auto rounded-xl items-center"
      >
        <Text className="text-white font-bold text-lg">Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
