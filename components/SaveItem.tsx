import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { TouchableOpacity, View } from "react-native";
export default function SaveItem () {
    const [saved, setSaved] = useState(false);

    const saveHandler = () => {
        setSaved(prev => !prev);
    }

    return (
        <View >
            <TouchableOpacity onPress={saveHandler} className="w-10 h-10 bg-black items-center justify-center opacity-70 rounded-[50%]">
           {!saved ? <Feather name="heart" size={20} color="gray"  /> :
            <Entypo name="heart" size={24} color="#FF5C00" />}
            </TouchableOpacity>
        </View>
    )
}