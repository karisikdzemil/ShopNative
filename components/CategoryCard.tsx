import { Image, View } from "react-native";
import mensClothing from "../assets/categories/mensClothing.jpg";

export default function CategoryCard () {

    return(
        <View className="w-[300px] h-40 rounded-xl  bg-[#1C1C1E]">  
                  <Image  source={mensClothing} resizeMode="cover" style={{ width: '100%', height: '100%' }}/>
        </View>
    )
}