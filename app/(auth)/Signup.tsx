import { auth, db } from "@/FirebaseConfig";
import { Address, PaymentMethod, setUser } from "@/redux/slices/userSlice";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        fullName,
        email,
        createdAt: new Date(),
        savedItems: [],
        address: [],
        paymentMethods: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);

      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists()) {
        dispatch(setUser({ uid: user.uid, ...docSnap.data() as {
                    email: string;
                    fullName: string | null;
                    savedItems: any[];
                    address: Address | null;
                    paymentMethods: PaymentMethod[];
                  }}));
      } else {
        throw new Error("User data not found in Firestore.");
      }

      setLoading(false);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Signup error:", error);
      setLoading(false);
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View className="pt-20 items-center gap-5">
        <Text className="text-3xl mx-auto text-white font-bold">
          Create Account
        </Text>
        <Text className="text-gray-400">
          Join our community and start shopping today
        </Text>
      </View>

      <View className="w-[90%] mx-auto mt-10">
        <Text className="text-white font-bold mb-2">Full Name</Text>
        <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center relative">
          <Feather
            style={{ position: "absolute", left: 10, zIndex: 1 }}
            name="user"
            size={24}
            color="gray"
          />
          <TextInput
            className="bg-[#29292c] w-full pl-12 text-gray-400 z-0"
            placeholder="Enter your Full Name"
            placeholderTextColor="gray"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </View>

      <View className="w-[90%] mx-auto mt-10">
        <Text className="text-white font-bold mb-2">Email</Text>
        <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center relative">
          <Feather
            style={{ position: "absolute", left: 10, zIndex: 1 }}
            name="mail"
            size={24}
            color="gray"
          />
          <TextInput
            className="bg-[#29292c] w-full pl-12 text-gray-400 z-0"
            placeholder="Enter your Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View className="w-[90%] mx-auto mt-10">
        <Text className="text-white font-bold mb-2">Password</Text>
        <View className="h-12 bg-[#29292c] rounded-lg flex-row items-center relative">
          <Feather
            style={{ position: "absolute", left: 10, zIndex: 1 }}
            name="lock"
            size={24}
            color="gray"
          />
          <TextInput
            className="bg-[#29292c] w-full pl-12 text-gray-400 z-0"
            placeholder="Enter your Password"
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {!loading ? (
        <View className="w-[90%] mx-auto mt-16">
          <TouchableOpacity
            className="py-3 rounded-lg bg-[#FF5C00]"
            onPress={handleSignup}
          >
            <Text className="text-white text-center text-2xl font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator size="large" className="p-10" color="#FF5C00" />
      )}

      <View className="flex-row gap-2 justify-end mt-10 pr-7">
        <Text className="text-white">You already have an account? </Text>
        <Link className="text-[#FF5C00]" href="/(auth)/Login">
          Login
        </Link>
      </View>

      <View className="py-12 flex-row items-center justify-center gap-3">
        <View className="h-1 w-[150px] border-t-2 border-gray-500"></View>
        <Text className="text-gray-400 text-xl">or</Text>
        <View className="h-1 w-[150px] border-t-2 border-gray-500"></View>
      </View>

      <View className="w-[90%] mx-auto">
        <TouchableOpacity
          onPress={() => Alert.alert("We are working on that funcitonality!")}
          className="py-3 rounded-lg border-2 border-[#FF5C00]"
        >
          <Text className="text-center text-2xl font-bold text-[#FF5C00]">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
