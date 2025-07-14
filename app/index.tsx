import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RedirectFunction() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user?.uid) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/Login"); 
    }
  }, [user]);

  return null; 
}