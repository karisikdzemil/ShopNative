import { db } from "@/FirebaseConfig";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function OrdersHistory() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-20 bg-[#1C1C1E] relative mb-4">
          <TouchableOpacity
            className="absolute top-20 left-5"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Orders History
          </Text>
        </View>

        <View className="px-5 pb-10">
          {loading ? (
            <ActivityIndicator color="white" size="large" />
          ) : orders.length === 0 ? (
            <Text className="text-white text-center mt-5">
              No orders yet.
            </Text>
          ) : (
            orders.map((order) => (
              <View
                key={order.id}
                className="bg-[#1F1F1F] rounded-xl p-4 mb-4"
              >
                <Text className="text-white font-bold text-lg">
                  Total: ${order.total.toFixed(2)}
                </Text>
                <Text className="text-gray-400">
                  Status: {order.status || "pending"}
                </Text>
                <Text className="text-gray-400">
                  Items: {order.items?.length}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  Ordered:{" "}
                  {order.createdAt?.toDate
                    ? order.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
