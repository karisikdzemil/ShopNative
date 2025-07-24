import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const navigation = useNavigation();

  const fakeUser = {
    name: "Džemil Karisik",
    email: "dzemil@example.com",
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const toggleNotifications = () =>
    setNotificationsEnabled((prev) => !prev);

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-20 bg-[#1C1C1E] relative">
          <TouchableOpacity
            className="absolute top-20 left-5"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl mx-auto text-white font-bold">
            Settings
          </Text>
        </View>

        <View className="px-5 mt-5">
          <Text className="text-white text-lg font-semibold mb-1">
            {fakeUser.name}
          </Text>
          <Text className="text-gray-400 mb-5">{fakeUser.email}</Text>
        </View>

        <View className="px-5 gap-5">

          <SettingItem
            label="Change Password"
            icon="lock-closed"
            onPress={() => navigation.navigate("ChangePassword")}
          />

          <SettingItem
            label="Manage Addresses"
            icon="location"
            onPress={() => navigation.navigate("/profile/ManageAddresses")}
          />

          <SettingSwitch
            label="Notifications"
            icon="notifications"
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />

          <SettingItem
            label="Theme"
            icon="contrast"
            onPress={() => Alert.alert("Theme switch coming soon!")}
          />

          <SettingItem
            label="Logout"
            icon="exit"
            danger
            onPress={() => Alert.alert("Logged out successfully")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function SettingItem({ label, icon, onPress, danger = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between bg-[#1C1C1E] rounded-xl px-5 py-4 ${
        danger ? "border border-red-500" : ""
      }`}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#ef4444" : "#ffffff"}
        />
        <Text
          className={`text-base ${
            danger ? "text-red-500" : "text-white"
          } font-medium`}
        >
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={danger ? "#ef4444" : "#aaa"}
      />
    </TouchableOpacity>
  );
}

function SettingSwitch({ label, icon, value, onValueChange }) {
  return (
    <View className="flex-row items-center justify-between bg-[#1C1C1E] rounded-xl px-5 py-4">
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={22} color="white" />
        <Text className="text-base text-white font-medium">{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? "#1C1C1E" : "#FF5C00"}
        trackColor={{ false: "#767577", true: "#FF5C00" }}
      />
    </View>
  );
}
