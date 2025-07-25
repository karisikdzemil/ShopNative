import ProfileCard from "@/components/ProfileCard";
import { db } from "@/FirebaseConfig";
import { deleteCart } from "@/redux/slices/cartSlice";
import { clearUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const [orders, setOrders] = useState<any>([]);
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  let totalItems = cart.cartItems.reduce((acc, el) => acc + el.quantity, 0);

  const clearUserHandler = () => {
    dispatch(clearUser());
    dispatch(deleteCart());
    router.replace("/(auth)/Login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.uid) return;
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

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

      <View className="bg-[#1C1C1E] h-[10vh] justify-evenly mt-5 border-1 gap-5 flex-row items-center p-5">
        <View className="justify-center items-center">
          {orders.length > 0 ? (
            <Text className="text-3xl font-bold text-[#FF5C00]">
              {orders.length}
            </Text>
          ) : (
            <Text className="text-3xl font-bold text-[#FF5C00]">0</Text>
          )}
          <Text className="text-gray-400">Orders</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-3xl font-bold text-[#FF5C00]">
            {user.savedItems.length}
          </Text>
          <Text className="text-gray-400">Favorites</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-3xl font-bold text-[#FF5C00]">{totalItems}</Text>
          <Text className="text-gray-400">Cart Items</Text>
        </View>
      </View>

      <View className="mt-5">
        <ProfileCard
          title="My orders"
          text="View your order history"
          icon="package"
          path="/profile/OrdersHistory"
        />
        <ProfileCard
          title="Wishlist"
          text={`${user.savedItems.length} items`}
          icon="heart"
          path="/profile/WishList"
        />
        <ProfileCard
          title="Addresses"
          text="Manage delivery addresses"
          icon="navigation"
          path="/profile/ManageAddresses"
        />
        <ProfileCard
          title="Payment Methods"
          text="Manage payment options"
          icon="credit-card"
          path="/profile/PaymentMethods"
        />
        <ProfileCard
          title="Settings"
          text="App preferences"
          icon="settings"
          path="/profile/Settings"
        />
      </View>

      <View className="h-[5vh] mt-10 bg-[#1C1C1E] pl-5 ">
        <TouchableOpacity onPress={clearUserHandler}>
          <View className="h-[5vh] flex-row items-center gap-5">
            <Feather name="log-out" size={26} color="red" />
            <Text className="text-xl font-bold text-red-500">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
