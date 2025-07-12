import { Image, Text, View } from "react-native";

export default function CategoryCard ( {imageUrl, title, items}: any ) {

    return(
        <View className="w-[90%] h-40 rounded-xl  bg-[#1C1C1E] mt-5 mx-5">  
                  <Image className="rounded-xl"  source={imageUrl} resizeMode="cover" style={{ width: '100%', height: '100%' }}/>
                  <View className="w-[100%] h-24 bg-black opacity-80 absolute bottom-0 p-5">
                        <Text className="text-white text-xl font-bold">{title}</Text>
                        <Text className="text-gray-400">{items} Items</Text>
                  </View>
        </View>
    )
}