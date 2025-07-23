import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Link, useNavigation } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function Checkout() {
  const navigation = useNavigation();
   const cart = useSelector((state: RootState) => state.cart);
  const { items: products } = useSelector((state: RootState) => state.products);

  const cartItemsWithProduct = cart.cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return {
      ...cartItem,
      ...product,
    };
  });
  const subtotal = cartItemsWithProduct.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;


  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-16 bg-[#1C1C1E] relative">
          <TouchableOpacity
            className="absolute top-20 left-5"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Checkout
          </Text>
        </View>

        <View className="p-5 gap-3 bg-[#1C1C1E] mt-5">
          <View className="flex-row items-center justify-start gap-3">
            <Ionicons name="location-outline" size={24} color="gray" />
            <Text className="text-white text-xl font-bold">
              Shipping Address
            </Text>
          </View>
          <View className="bg-[#242426] p-5 rounded-xl gap-1">
            <Text className="text-white font-bold text-lg">John Doe</Text>
            <Text className="text-gray-400">Ulica neka</Text>
            <Text className="text-gray-400">Grad neki</Text>
            <Text className="text-gray-400">Drzava Neka</Text>
          </View>
          <Link href="/profile/ManageAddresses" className="text-[#FF5C00] ml-1">
            Change
          </Link>
        </View>
        <View className="p-5 gap-3 mt-5 bg-[#1C1C1E]">
          <View className="flex-row items-center justify-start gap-3">
            <Feather name="credit-card" size={24} color="gray" />
            <Text className="text-white text-xl font-bold">Payment Method</Text>
          </View>
          <TouchableOpacity className="bg-[#242426] p-5 rounded-xl gap-1">
            <Text className="text-white font-bold text-lg">
              Credit/Debit Card
            </Text>
            <Text className="text-gray-400">**** **** **** 1234</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#242426] p-5 rounded-xl gap-1">
            <Text className="text-white font-bold text-lg">PayPal</Text>
            <Text className="text-gray-400">paypal@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <View className="p-5 gap-3 bg-[#1C1C1E] mt-5">
          <View className="flex-row items-center justify-start gap-3">
            <Feather name="truck" size={24} color="gray" />
            <Text className="text-white text-xl font-bold">
              Delivery Options
            </Text>
          </View>
          <View className="bg-[#242426] p-5 rounded-xl gap-1">
            <Text className="text-white font-bold text-lg">
              Standard Delivery
            </Text>
            <Text className="text-gray-400">5-7 business day</Text>
            <Text className="text-white font-bold text-lg">Free</Text>
          </View>
        </View>
        <View className="p-5 gap-3 bg-[#1C1C1E] my-5">
          <View className="flex-row items-center justify-start gap-3">
            <Text className="text-white text-xl font-bold">
              Order Summary
            </Text>
          </View>
          <View className="bg-[#242426] rounded-xl">
            <View className="flex-row justify-between px-5 pt-5 p-1 items-center">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-white font-bold">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between px-5 py-1 items-center">
              <Text className="text-gray-400">Tax (10%)</Text>
              <Text className="text-white font-bold">${tax.toFixed(2)}</Text>
            </View>
            <View className="flex-row pb-2 border-b-[1px] border-gray-600 justify-between px-5 py-1 items-center">
              <Text className="text-gray-400">Shipping</Text>
              <Text className="text-white font-bold">Free</Text>
            </View>
            <View className="flex-row py-5 justify-between px-5 items-center">
              <Text className="text-2xl text-white font-bold">Total</Text>
              <Text className="text-white font-bold text-2xl">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
       <View className=" bg-[#1C1C1E] p-5 items-center gap-5">
        <Text className="text-white text-2xl font-bold">Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity className="py-4 w-[90%] mb-5 rounded-lg bg-[#FF5C00]">
          <Text className="text-white text-center text-2xl font-bold">
            Proceed to checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
