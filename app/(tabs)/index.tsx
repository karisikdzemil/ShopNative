import AutoScrollSlider from "@/components/AutoScrollSlider";
import Item from "@/components/Item";
import TitleSee from "@/components/TitleSee";
import { fetchProducts } from "@/redux/slices/productsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Product } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featured = products.slice(0, 4);

  const goToAddressHandler = () => {
    router.push("/profile/ManageAddresses")
    setVisible(false)
  }
   const goToPaymentHandler = () => {
    router.push("/profile/PaymentMethods")
    setVisible(false)
  }

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView>
        <View className="bg-[#1C1C1E] mt-20 flex-row justify-between items-center p-5">
          <View className="flex-col gap-2">
            <Text className="text-xl text-gray-400">Welcome Back</Text>
            <Text className="text-2xl font-bold text-white">
              {user.fullName}
            </Text>
          </View>
          <View className="flex-row gap-5 relative">
            <View className="p-4">
              <Link
                href="/(tabs)/categories"
                className="p-2 bg-[#2f2e2e] rounded-xl"
              >
                <Feather name="search" size={32} color="white" />
              </Link>
            </View>

            <View className="p-4">
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Feather
                  name="bell"
                  size={32}
                  color="white"
                  className="p-2 bg-[#2f2e2e] rounded-xl"
                />
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
              >
                <View className="flex-1 justify-center items-center bg-black/50">
                  <View className="bg-[#1c1c1e] p-6 rounded-2xl w-80">
                    <Text className="text-white text-xl font-bold mb-2">
                      Message
                    </Text>
                    {user.paymentMethods.length === 0 ||
                    Array.isArray(user.address) ? (
                      <View className="bg-gray-300 p-4 rounded-xl mt-4">
                        <Text className="text-red-800 font-semibold text-center mb-2">
                          To make a purchase, you need to add your address and a
                          payment method.
                        </Text>
                        <View className="flex-row justify-center gap-6">
                          <TouchableOpacity
                            onPress={goToAddressHandler}
                          >
                            <Text className="text-[#FF5C00] underline">
                              Add Address
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={goToPaymentHandler}
                          >
                            <Text className="text-[#FF5C00] underline">
                              Add Payment
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View className="p-4 mt-4">
                        <Text className="text-center text-gray-500">
                          There are currently no messages.
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      onPress={() => setVisible(false)}
                      className="bg-[#FF5C00] rounded-xl p-3 mt-2"
                    >
                      <Text className="text-white text-center font-semibold">
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {(user.paymentMethods.length === 0 ||
              Array.isArray(user.address)) && (
              <Text className="text-white w-6 h-6 pt-0.5 text-center rounded-[50%] right-0 top-0 bg-red-600 absolute">
                1
              </Text>
            )}
          </View>
        </View>

        <AutoScrollSlider />

        <View className="h-[90vh] p-5">
          <TitleSee title="Featured" />

          {!loading && featured.length > 0 && (
            <FlatList<Product>
              data={featured}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  imageUrl={item.image}
                  title={item.title}
                  category={item.category}
                  rating={item.rating}
                  price={item.price}
                />
              )}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 20,
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: 400,
              }}
            />
          )}

          {loading && (
            <View className="flex-1 justify-center align-center">
              <ActivityIndicator size="large" color="#FF5C00" />
            </View>
          )}
          {error && (
            <Text className="text-red-500 text-center mt-5">{error}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
