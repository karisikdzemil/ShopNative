import Feather from "@expo/vector-icons/Feather"
import { Text, TouchableOpacity, View } from "react-native"
export default function ProfileCard ( {title, text, icon}: any ) {

    return (
         <TouchableOpacity>
          <View className="bg-[#1C1C1E] h-[7vh] pl-5 border-b-[0.5px] border-gray-500 flex-row items-start gap-5">
            <View className="justify-center h-[7vh]">
              <Feather name={icon} size={32} color="gray" />
            </View>
            <View className="justify-center h-[7vh]">
              <Text className="text-white text-xl font-bold">{title}</Text>
              <Text className="text-gray-400">{text}</Text>
            </View>
            <Text className="absolute right-5 top-6 text-white text-xl">
              {">"}
            </Text>
          </View>
        </TouchableOpacity>
    )
}