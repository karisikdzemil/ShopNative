import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from "react-native";
import SaveItem from './SaveItem';

export default function Item({imageUrl, title, category, rating, price, id}: any) {
  const route = useRouter();

  return (
    <View className="w-[48%] h-[35vh] bg-[#1C1C1E] rounded-md relative">
     <TouchableOpacity onPress={() => route.push(`/itemPage/${id}`)}>
       {/* {newSale} */}
      <View className='absolute right-4 top-4 z-20'>
        <SaveItem itemId={id}/>
      </View>
      <Image
        className="rounded-xl"
        source={{ uri: imageUrl }}  
        resizeMode="cover"
        style={{ width: "100%", height: "60%", zIndex: 1 }}
      />
       <View className="p-3">
         <Text className="text-xl text-white font-bold " numberOfLines={1}>{title}</Text>
        <Text className="text-base text-gray-400">{category}</Text>
        <Text className="text-sm text-gray-400">
        <FontAwesome  name="star" size={15} color="yellow" />
             {' '} {rating.rate} {(rating.count)}</Text>
        <Text className="text-xl text-white font-bold">${price}</Text>
       </View>
     </TouchableOpacity>
    </View>
  );
}
