import { auth } from "@/FirebaseConfig";
import { setUser } from "@/redux/slices/userSlice";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        fullName: null
      }));
      setLoading(false);
      router.replace("/(tabs)"); 
    } catch (error: any) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="pt-20 items-center gap-5">
        <Text className="text-3xl text-white font-bold">Welcome Back</Text>
        <Text className="text-gray-400">Sign In to your account to continue shopping.</Text>
      </View>

      <View className="w-[90%] mx-auto mt-10">
        <Text className="text-white font-bold mb-2">Email</Text>
        <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center relative">
          <Feather style={{ position: "absolute", left: 10, zIndex:1 }} name="mail" size={24} color="gray" />
          <TextInput
            className="bg-[#29292c] w-full z-0 pl-12 text-gray-400 "
            placeholder="Enter your email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </View>

      <View className="w-[90%] mx-auto mt-10">
        <Text className="text-white font-bold mb-2">Password</Text>
        <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center relative">
          <Feather style={{ position: "absolute", left: 10, zIndex:1 }} name="lock" size={24} color="gray" />
          <TextInput
            className="bg-[#29292c] w-full pl-12 z-0 text-gray-400"
            placeholder="Enter your password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Text className="text-[#FF5C00] text-right mt-2">Forgot Password?</Text>
      </View>

      {!loading ? <View className="w-[90%] mx-auto mt-16">
        <TouchableOpacity className="py-5 rounded-lg bg-[#FF5C00]" onPress={handleLogin}>
          <Text className="text-white text-center text-2xl font-bold">Sign In</Text>
        </TouchableOpacity>
      </View> :  <View className="flex-1 justify-center align-center">
                    <ActivityIndicator size="large" color="#FF5C00" />
                  </View>}

      <View className="flex-row gap-2 justify-end mt-10 pr-7">
        <Text className="text-white">{"Don't have an account?"}</Text>
        <Link className="text-[#FF5C00]" href="/(auth)/Signup">SignUp</Link>
      </View>

      <View className="py-12 flex-row items-center justify-center gap-3">
        <View className="h-1 w-[150px] border-t-2 border-gray-500"></View>
        <Text className="text-gray-400 text-xl">or</Text>
        <View className="h-1 w-[150px] border-t-2 border-gray-500"></View>
      </View>

      <View className="w-[90%] mx-auto">
        <TouchableOpacity onPress={() => Alert.alert("We are working on that funcitonality!")} className="py-3 rounded-lg border-2 border-[#FF5C00]">
          <Text className="text-center text-2xl font-bold text-[#FF5C00]">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
