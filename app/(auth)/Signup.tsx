import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
export default function Signup() {
  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="pt-20 items-center gap-5">
        <Text className="text-3xl mx-auto text-white font-bold">
          Create Account
        </Text>
            <Text className=" text-gray-400">Join our community and start shopping today</Text>
      </View>

  <View className="w-[90%] mx-auto mt-10">
  <Text className="text-white font-bold mb-2">Full Name</Text>
  
  <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center justify-center relative">
    <Feather
      style={{ position: "absolute", left: 10, zIndex: 10 }}
      name="mail"
      size={24}
      color="gray"
    />
    <TextInput
      className="bg-[#29292c] z-0 w-full pl-12 h-[60%] text-gray-400"
      placeholder="Enter your email"
      placeholderTextColor="gray"
    />
  </View>
</View>
     <View className="w-[90%] mx-auto mt-10">
  <Text className="text-white font-bold mb-2">Email</Text>
  
  <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center justify-center relative">
    <Feather
      style={{ position: "absolute", left: 10, zIndex: 10 }}
      name="mail"
      size={24}
      color="gray"
    />
    <TextInput
      className="bg-[#29292c] z-0 w-full pl-12 h-[60%] text-gray-400"
      placeholder="Enter your email"
      placeholderTextColor="gray"
    />
  </View>
</View>
     <View className="w-[90%] mx-auto mt-10">
  <Text className="text-white font-bold mb-2">Password</Text>
  
  <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center justify-center relative">
    <Feather
      style={{ position: "absolute", left: 10, zIndex: 10 }}
      name="lock"
      size={24}
      color="gray"
    />
    <TextInput
      className="bg-[#29292c] z-0 w-full pl-12 h-[60%] text-gray-400"
      placeholder="Enter your password"
      placeholderTextColor="gray"
    />
  </View>
</View>
     <View className="w-[90%] mx-auto mt-16">

    <TouchableOpacity className="py-5 rounded-lg text-center bg-[#FF5C00]">
           <Text className="text-white w-full text-center text-2xl font-bold">Sign Up</Text>
    </TouchableOpacity>
    </View>
     <View className="w-full flex-row gap-2 justify-end mt-10 pr-7">
                    <Text className="text-white">Don't have an account? </Text>
                    <Link className="text-[#FF5C00]" href="/(auth)/Login">SignUp</Link>
                </View>
    </View>
  );
}
