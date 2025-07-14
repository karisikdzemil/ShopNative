import { Link } from "expo-router";
import { View } from "react-native";

export default function RedirectFunction () {
    return (
       <View>
         <Link href='/(auth)/Login'>Login</Link>
         <Link href='/(tabs)'>home</Link>
       </View>
    )
}