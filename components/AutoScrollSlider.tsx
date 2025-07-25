import CategoryCard from "@/components/CategoryCard";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

import TitleSee from "./TitleSee";

const { width } = Dimensions.get("window");

export default function AutoScrollSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const startAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % categoryArr.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 2000);
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
    startAutoScroll();
  };

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <TitleSee title="Categories" />
      <FlatList
        ref={flatListRef}
        data={categoryArr}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <CategoryCard
              imageUrl={item.imageUrl}
              title={item.title}
              items={item.items}
            />
          </View>
        )}
      />

      <View className="flex-row justify-center mt-5 gap-3">
        {categoryArr.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            className={
              currentIndex === index
                ? "w-8 h-2 rounded-lg bg-[#FF5C00]"
                : "w-2 h-2 rounded-[50%] bg-[#888]"
            }
          />
        ))}
      </View>
    </View>
  );
}

const categoryArr = [
  {
    id: "1a",
    imageUrl: require("../assets/categories/mensClothing.jpg"),
    title: "Men's Clothing",
    items: 14,
  },
  {
    id: "2a",
    imageUrl: require("../assets/categories/Jewerly.jpg"),
    title: "Jewerly",
    items: 10,
  },
  {
    id: "3a",
    imageUrl: require("../assets/categories/womansClothing.jpg"),
    title: "Woman's Clothing",
    items: 24,
  },
  {
    id: "4a",
    imageUrl: require("../assets/categories/electronics.jpeg"),
    title: "Electronics",
    items: 4,
  },
];
