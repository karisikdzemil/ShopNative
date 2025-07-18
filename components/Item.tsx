// import { RootState } from '@/redux/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Text, View } from "react-native";
// import { useSelector } from 'react-redux';
import SaveItem from './SaveItem';

export default function Item({imageUrl, title, category, rating, price, id}: any) {
  // const newOrSale = Math.random() * 10;

  // let newSale = <View className="hidden"></View>;
  // if(newOrSale > 6){
  //     newSale = <View className='w-12 absolute p-1 drop-shadow-xl shadow-black left-5 top-5 rounded-[200px] z-20 bg-green-500'><Text className='text-white text-center font-bold'>New</Text></View>
  // }else if(newOrSale < 3){
  //     newSale = <View className='w-12 absolute p-1 drop-shadow-xl shadow-black left-5 top-5 rounded-[200px] z-20 bg-orange-500'><Text className='text-white text-center font-bold'>Sale</Text></View>
  // }

  return (
    <View className="w-[48%] h-[35vh] bg-[#1C1C1E] rounded-md relative">
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
    </View>
  );
}
