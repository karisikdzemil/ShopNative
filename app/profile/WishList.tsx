import Item from "@/components/Item";
import { RootState } from "@/redux/store";
import { Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function WishList() {
  const {items: products, error, loading} = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();
  const wishList = products.filter((el) => user.savedItems.includes(el.id));

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-20 bg-[#1C1C1E] relative">
            <TouchableOpacity className="absolute top-20 left-5" onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Wish List
          </Text>
        </View>
         
          {!loading && wishList.length > 0 && (
                   <FlatList<Product>
                     data={wishList}
                     keyExtractor={(item) => item.id.toString()}
                     scrollEnabled={false}
                     renderItem={({ item }) => {
                       const newOrSale = Math.random() * 10;
                       return <Item
                         id={item.id}
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
                       paddingTop: 40,
                       paddingBottom: 40,
                       paddingHorizontal: 20,
                     }}
                   />
                 )}
                {error && (
                     <Text className="text-red-500 text-center mt-5">{error}</Text>
                   )}

                    {!loading && wishList.length === 0 && (
            <Text className="text-center text-white mt-10 text-lg">
              You have no items in your wish list.
            </Text>
          )}

      </ScrollView>
    </View>
  );
}
