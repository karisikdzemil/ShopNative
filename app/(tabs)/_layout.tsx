import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen name="index" options={{title: "Home", headerShown: false}}/>
    <Tabs.Screen name="categories" options={{title: "Categories", headerShown: false}}/>
    <Tabs.Screen name="cart" options={{title: "Cart", headerShown: false}}/>
    <Tabs.Screen name="profile" options={{title: "Profile", headerShown: false}}/>
  </Tabs>;
}
