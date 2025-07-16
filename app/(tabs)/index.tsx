import AutoScrollSlider from "@/components/AutoScrollSlider";
import Item from "@/components/Item";
import TitleSee from "@/components/TitleSee";
import { fetchProducts } from "@/redux/slices/productsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Product } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const featured = products.slice(0, 4);

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView>
        <View className="bg-[#1C1C1E] mt-20 flex-row justify-between items-center p-5">
          <View className="flex-col gap-2">
            <Text className="text-xl text-gray-400">Good Morning,</Text>
            <Text className="text-2xl font-bold text-white">{user.fullName}</Text>
          </View>
           {/* <TouchableOpacity onPress={() => dispatch(clearUser())} >
       <Text className="text-5xl text-white">Brisii</Text>
      </TouchableOpacity> */}
          <View className="flex-row gap-5">
            <Feather
              name="search"
              size={32}
              color="white"
              className="p-2 bg-[#2f2e2e] rounded-xl"
            />
            <Feather
              name="bell"
              size={32}
              color="white"
              className="p-2 bg-[#2f2e2e] rounded-xl"
            />
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
              renderItem={({ item }) => {
                const newOrSale = Math.random() * 10;
               return <Item
                  imageUrl={item.image}
                  title={item.title}
                  category={item.category}
                  rating={item.rating}
                  price={item.price}
                  newOrSale={newOrSale}
                />
              }}
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
