import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function ItemPage () {
    const { id } = useLocalSearchParams();

    return <View>
        <Text>Item Page</Text>
        <Text>ID bejbiii: {id}</Text>
    </View>
}