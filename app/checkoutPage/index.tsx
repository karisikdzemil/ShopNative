import { db } from "@/FirebaseConfig";
import { setCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Link, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Checkout() {
  const [card, setCard] = useState<number | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const { items: products } = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    user.paymentMethods.length > 0 && setCard(0);
  }, []);

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

  const placeOrderHandler = async () => {
    if (Array.isArray(user.address)) {
      Alert.alert("You need to add a shipping address");
      return;
    }
    if (user.paymentMethods.length === 0 || card === null) {
      Alert.alert("You need to select a payment method");
      return;
    }

    try {
      setPlacingOrder(true);
      const userId = user.uid;

      const cartItemsColRef = collection(db, "users", userId, "cartItems");
      const cartItemsSnap = await getDocs(cartItemsColRef);

      const items = cartItemsSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (items.length === 0) {
        Alert.alert("Cart is empty");
        return;
      }

      const selectedPayment = user.paymentMethods[card];

      const orderData = {
        items,
        total,
        tax,
        subtotal,
        createdAt: serverTimestamp(),
        status: "pending",
        shippingAddress: user.address,
        paymentMethod: selectedPayment,
      };

      const ordersColRef = collection(db, "users", userId, "orders");
      await addDoc(ordersColRef, orderData);

      const batch = writeBatch(db);
      cartItemsSnap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      dispatch(setCart([]));
      Alert.alert("Order placed successfully!");
      navigation.goBack();
    } catch (err) {
      console.error("Error placing order:", err);
      Alert.alert("Error", "Could not place order");
    } finally {
      setPlacingOrder(false);
    }
  };

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
          <Text className="text-3xl mx-auto text-white font-bold">Checkout</Text>
        </View>

        <View className="p-5 gap-3 bg-[#1C1C1E] mt-5">
          <View className="flex-row items-center justify-start gap-3">
            <Ionicons name="location-outline" size={24} color="gray" />
            <Text className="text-white text-xl font-bold">
              Shipping Address
            </Text>
          </View>
          {user.address && !Array.isArray(user.address) ? (
            <View className="bg-[#242426] p-5 rounded-xl gap-1">
              <Text className="text-white font-bold text-lg">{user.fullName}</Text>
              <Text className="text-gray-400">{user.address.street}</Text>
              <Text className="text-gray-400">
                {user.address.postalCode}, {user.address.city}
              </Text>
              <Text className="text-gray-400">{user.address.country}</Text>
            </View>
          ) : (
            <View className="bg-[#242426] p-5 rounded-xl gap-3 items-start">
              <Text className="text-white text-lg font-bold">No Address Found</Text>
              <Text className="text-gray-400">
                You need to add a shipping address before placing an order.
              </Text>
              <Link href="/profile/ManageAddresses">
                <Text className="text-[#FF5C00] font-bold text-base mt-2">
                  + Add Shipping Address
                </Text>
              </Link>
            </View>
          )}
          {user.address && !Array.isArray(user.address) && (
            <Link href="/profile/ManageAddresses" className="text-[#FF5C00] ml-1">
              <Text> Change</Text>
            </Link>
          )}
        </View>

        <View className="p-5 gap-3 mt-5 bg-[#1C1C1E]">
          <View className="flex-row items-center justify-start gap-3">
            <Feather name="credit-card" size={24} color="gray" />
            <Text className="text-white text-xl font-bold">Payment Method</Text>
          </View>
          {user.paymentMethods.length > 0 ? (
            user.paymentMethods.map((el, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setCard(i)}
                className={`${
                  card === i && "border-[1px] border-green-500"
                } bg-[#242426] flex-row items-center justify-between p-5 rounded-xl gap-1`}
              >
                <View>
                  <Text className="text-white font-bold text-lg">{el.method}</Text>
                  {el.method === "Card" ? (
                    <Text className="text-gray-400">{el.number}</Text>
                  ) : (
                    <Text className="text-gray-400">{el.email}</Text>
                  )}
                </View>
                {card === i && <Feather name="check" size={24} color="green" />}
              </TouchableOpacity>
            ))
          ) : (
            <View className="bg-[#242426] p-5 rounded-xl gap-3 items-start">
              <Text className="text-white text-lg font-bold">No Payment Method</Text>
              <Text className="text-gray-400">
                You need to add at least one payment method to continue.
              </Text>
              <Link href="/profile/PaymentMethods">
                <Text className="text-[#FF5C00] font-bold text-base mt-2">
                  + Add Payment Method
                </Text>
              </Link>
            </View>
          )}
        </View>

        <View className="p-5 gap-3 bg-[#1C1C1E] mt-5">
          <View className="flex-row items-center justify-start gap-3">
            <Feather name="truck" size={24} color="gray" />
            <Text className="text-white text-xl font-bold">Delivery Options</Text>
          </View>
          <View className="bg-[#242426] p-5 rounded-xl gap-1">
            <Text className="text-white font-bold text-lg">Standard Delivery</Text>
            <Text className="text-gray-400">5-7 business day</Text>
            <Text className="text-white font-bold text-lg">Free</Text>
          </View>
        </View>

        <View className="p-5 gap-3 bg-[#1C1C1E] my-5">
          <View className="flex-row items-center justify-start gap-3">
            <Text className="text-white text-xl font-bold">Order Summary</Text>
          </View>
          <View className="bg-[#242426] rounded-xl">
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
          </View>
        </View>
      </ScrollView>
      <View className="bg-[#1C1C1E] p-5 items-center gap-5">
        <Text className="text-white text-2xl font-bold">
          Total: ${total.toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={placeOrderHandler}
          disabled={placingOrder}
          className="py-4 w-[90%] mb-5 rounded-lg bg-[#FF5C00]"
        >
          <Text className="text-white text-center text-2xl font-bold">
            {placingOrder ? "Placing..." : "Place Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
