import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function PaymentMethods() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

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
            Payment Methods
          </Text>
        </View>

        <View className="bg-[#1C1C1E] mt-10 p-5">
          <Text className="text-white text-xl font-bold text-center mb-5">
            Add Payment Method
          </Text>

          <View className="flex-row justify-around mb-8">
            <TouchableOpacity
              className={`items-center p-5 rounded-2xl w-[45%] ${
                selectedMethod === "card" ? "bg-[#2C2C2E]" : "bg-[#1C1C1E]"
              }`}
              onPress={() => setSelectedMethod("card")}
            >
              <Feather name="credit-card" size={28} color="white" />
              <Text className="text-white mt-2">Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`items-center p-5 rounded-2xl w-[45%] ${
                selectedMethod === "paypal" ? "bg-[#2C2C2E]" : "bg-[#1C1C1E]"
              }`}
              onPress={() => setSelectedMethod("paypal")}
            >
              <FontAwesome name="cc-paypal" size={28} color="white" />

              <Text className="text-white mt-2">PayPal</Text>
            </TouchableOpacity>
          </View>

          {selectedMethod === "card" && (
            <View className="gap-4">
              <TextInput
                placeholder="Card Number"
                placeholderTextColor="#999"
                className="bg-[#2C2C2E] text-white p-4 rounded-xl"
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Name on Card"
                placeholderTextColor="#999"
                className="bg-[#2C2C2E] text-white p-4 rounded-xl"
              />
              <View className="flex-row gap-4">
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor="#999"
                  className="bg-[#2C2C2E] text-white p-4 rounded-xl flex-1"
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor="#999"
                  className="bg-[#2C2C2E] text-white p-4 rounded-xl flex-1"
                  secureTextEntry
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}

          {selectedMethod === "paypal" && (
            <View className="gap-4">
              <TextInput
                placeholder="PayPal Email"
                placeholderTextColor="#999"
                className="bg-[#2C2C2E] text-white p-4 rounded-xl"
                keyboardType="email-address"
              />
            </View>
          )}

          {selectedMethod && (
            <TouchableOpacity className="mt-10 bg-[#FF5C00] p-4 rounded-xl">
              <Text className="text-white text-center font-bold">
                Save Payment Method
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
