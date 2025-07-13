import Item from "@/components/Item";
import { RootState } from "@/redux/store";
import { Product } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const categories = ["All", "Men's", "Women's", "Jewelery", "Electronics"];

export default function Categories() {
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  let filteredProducts = [];
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  if (currentCategory === "All") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter((el, i) => {
      console.log(el.category, currentCategory);
      return el.category.toLowerCase().includes(currentCategory.toLowerCase());
    });
  }

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="pt-20 bg-[#1C1C1E]">
        <Text className="text-3xl mx-auto text-white font-bold">
          Categories
        </Text>

        <View className="w-[90%] h-12 bg-[#29292c] rounded-lg mx-auto flex-row mt-10 items-center justify-center">
          <Feather
            className="absolute z-10 left-1"
            name="search"
            size={24}
            color="gray"
          />
          <TextInput
            className="bg-[#29292c] z-0 w-full pl-12 h-[60%] text-gray-400"
            placeholder="Search products..."
            placeholderTextColor="gray"
          />
        </View>
        <FlatList
          className="py-7"
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View
              className={`p-3 mx-2 min-w-[100px] rounded-[200px]  ${item === currentCategory ? "bg-[#FF5C00]" : "bg-[#29292c]"}`}
            >
              <TouchableOpacity onPress={() => setCurrentCategory(item)}>
                <Text
                  className={` w-full text-center ${item === currentCategory ? "text-white" : "text-gray-400"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

       {!loading && filteredProducts.length > 0 && (
                  <FlatList<Product>
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <Item
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
      
    </View>
  );
}
2;
