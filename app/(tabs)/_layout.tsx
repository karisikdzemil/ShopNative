import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
  return (
    <View className="w-[50px] h-[50px] flex items-center gap-1">
      <Feather name={icon} size={24} color={focused ? "orange" : "gray"} />
      <Text className={focused ? "text-orange-400" : "text-gray-400"}>
        {title}
      </Text>
    </View>
  );

  // return(
  //   <View className="text-gray-500">
  //       <Text>{icon}</Text>
  //       <Text>{title}</Text>
  //     </View>
  // )
};

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1C1C1E",
          paddingTop: "20",
          paddingBottom: "5",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="search" title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="shopping-cart" title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="user" title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
