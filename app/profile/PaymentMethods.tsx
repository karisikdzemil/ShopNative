import { db } from "@/FirebaseConfig";
import { addPaymentMethod } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentMethods() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [paypalEmail, setPaypalEmail] = useState("");

  const savePaymentHandler = async () => {
    if (!user.uid) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    let paymentData = null;

    if (selectedMethod === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        Alert.alert("Missing Fields", "Please fill in all card details.");
        return;
      }

      paymentData = {
        method: "Card",
        number: cardNumber,
        name: cardName,
        expiry: cardExpiry,
        cvv: cardCVV,
      };
    } else if (selectedMethod === "paypal") {
      if (!paypalEmail) {
        Alert.alert("Missing Field", "Please enter your PayPal email.");
        return;
      }

      paymentData = {
        method: "PayPal",
        email: paypalEmail,
      };
    }

    try {
      setLoading(true)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        paymentMethods: arrayUnion(paymentData),
      });

      dispatch(addPaymentMethod(paymentData));
      Alert.alert("Success", "Payment method saved.");

      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCVV("");
      setPaypalEmail("");
      setSelectedMethod(null);
      setLoading(false)
    } catch (error) {
      console.error("Error saving payment method:", error);
      Alert.alert("Error", "Failed to save payment method.");
      setLoading(false)
    }
  };

  console.log("user ovo ono", user.paymentMethods);

  return (
    <View style={{ backgroundColor: "#121212", flex: 1, paddingBottom: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-20 bg-[#1C1C1E] relative">
          <TouchableOpacity
            className="absolute top-20 left-5"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Payment Methods
          </Text>
        </View>

        {user.paymentMethods && user.paymentMethods.length > 0 && (
          <View className="rounded-2xl p-5 shadow-md mt-4">
            <Text className="text-lg text-white font-semibold mb-3">Method Of Payment</Text>

            {user.paymentMethods.map((el, index) => (
              <View
                key={index}
                className="bg-[#1F1F1F] p-4 rounded-xl mb-4 border border-gray-700"
              >
                {el.method === "Card" && (
                  <View className="space-y-2">
                    <Text className="text-white text-base font-semibold">
                      {"Owner's Name"}
                    </Text>
                    <Text className="text-gray-300">{user.fullName}</Text>

                    <Text className="text-white text-base font-semibold mt-2">
                      Broj kartice:
                    </Text>
                    <Text className="text-gray-300 tracking-widest">
                      {el.number}
                    </Text>

                    <View className="flex-row justify-between mt-2">
                      <View>
                        <Text className="text-white text-base font-semibold">
                          Istek:
                        </Text>
                        <Text className="text-gray-300">{el.expiry}</Text>
                      </View>
                      <View>
                        <Text className="text-white text-base font-semibold">
                          CVV:
                        </Text>
                        <Text className="text-gray-300">{el.cvv}</Text>
                      </View>
                    </View>
                  </View>
                )}

                {el.method === "PayPal" && (
                  <View className="space-y-2">
                    <Text className="text-white text-base font-semibold">
                      Način plaćanja:
                    </Text>
                    <Text className="text-gray-300">PayPal</Text>

                    <Text className="text-white text-base font-semibold mt-2">
                      Email:
                    </Text>
                    <Text className="text-gray-300">{el.email}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <View className="bg-[#1C1C1E] mt-10 p-5">
          <Text className="text-white text-xl font-bold text-center mb-5">
            Add Payment Method
          </Text>

          <View className="flex-row justify-around mb-8">
            <TouchableOpacity
              className={`items-center p-5 rounded-2xl w-[45%] ${
                selectedMethod === "card" ? "bg-[#2C2C2E]" : "bg-[#1C1C1E]"
              }`}
              onPress={() => setSelectedMethod("card")}
            >
              <Feather name="credit-card" size={28} color="white" />
              <Text className="text-white mt-2">Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`items-center p-5 rounded-2xl w-[45%] ${
                selectedMethod === "paypal" ? "bg-[#2C2C2E]" : "bg-[#1C1C1E]"
              }`}
              onPress={() => setSelectedMethod("paypal")}
            >
              <FontAwesome name="cc-paypal" size={28} color="white" />
              <Text className="text-white mt-2">PayPal</Text>
            </TouchableOpacity>
          </View>

          {selectedMethod === "card" && (
            <View className="gap-4">
              <TextInput
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholderTextColor="#999"
                className="bg-[#2C2C2E] text-white p-4 rounded-xl"
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Name on Card"
                value={cardName}
                onChangeText={setCardName}
                placeholderTextColor="#999"
                className="bg-[#2C2C2E] text-white p-4 rounded-xl"
              />
              <View className="flex-row gap-4">
                <TextInput
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  placeholderTextColor="#999"
                  className="bg-[#2C2C2E] text-white p-4 rounded-xl flex-1"
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="CVV"
                  value={cardCVV}
                  onChangeText={setCardCVV}
                  placeholderTextColor="#999"
                  className="bg-[#2C2C2E] text-white p-4 rounded-xl flex-1"
                  secureTextEntry
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}

          {selectedMethod === "paypal" && (
            <View className="gap-4">
              <TextInput
                placeholder="PayPal Email"
                value={paypalEmail}
                onChangeText={setPaypalEmail}
                placeholderTextColor="#999"
                className="bg-[#2C2C2E] text-white p-4 rounded-xl"
                keyboardType="email-address"
              />
            </View>
          )}

          {selectedMethod && (
            <TouchableOpacity
              onPress={savePaymentHandler}
              className="mt-10 bg-[#FF5C00] p-4 rounded-xl"
              disabled={loading}
            >
              <Text className="text-white text-center font-bold">
                Save Payment Method
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
