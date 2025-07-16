import { db } from "@/FirebaseConfig";
import { setUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SaveItem({ itemId }: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.savedItems?.includes(itemId)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [user, itemId]);

  const saveHandler = async () => {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);

      if (!saved) {
        await updateDoc(userRef, {
          savedItems: arrayUnion(itemId),
        });

        dispatch(setUser({
          ...user,
          savedItems: [...(user.savedItems || []), itemId],
        }));
        setSaved(true);
      } else {
        await updateDoc(userRef, {
          savedItems: arrayRemove(itemId),
        });

        dispatch(setUser({
          ...user,
          savedItems: user.savedItems.filter((id: string) => id !== itemId),
        }));
        setSaved(false);
      }
    } catch (error) {
      console.error("Error updating saved items:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={saveHandler}
        className="w-10 h-10 bg-black items-center justify-center opacity-80 rounded-full"
      >
        {!saved ? (
          <Feather name="heart" size={20} color="gray" />
        ) : (
          <Entypo name="heart" size={24} color="#FF5C00" />
        )}
      </TouchableOpacity>
    </View>
  );
}
