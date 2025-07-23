import { RootState } from "@/redux/store";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function CheckoutInfo() {
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
    <View className="bg-[#1C1C1E]">
      <View className="flex-row justify-between px-5 pt-5 p-1 items-center">
        <Text className="text-gray-400">Subtotal</Text>
        <Text className="text-white font-bold">${subtotal.toFixed(2)}</Text>
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
      <View className="w-[90%] mx-auto my-5">
        <Link href="/checkoutPage" className="py-4 rounded-lg bg-[#FF5C00]">
          <Text className="text-white text-center text-2xl font-bold">
            Proceed to checkout
          </Text>
        </Link>
      </View>
    </View>
  );
}
