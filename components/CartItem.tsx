import { db } from "@/FirebaseConfig";
import { setCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import Feather from "@expo/vector-icons/Feather";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

export default function CartItem({ id }: { id: number }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { items: products } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const targetItem = products.find((el) => el.id === id);
  const cartTargetItem = cartItems.find((el) => el.productId === id);

  const refreshCart = async () => {
    const cartRef = collection(db, "users", user.uid, "cartItems");
    const cartSnap = await getDocs(cartRef);
    const updatedCart = cartSnap.docs.map((doc) => ({
      productId: doc.data().productId,
      quantity: doc.data().quantity,
      color: doc.data().color,
      size: doc.data().size,
    }));
    dispatch(setCart(updatedCart));
  };

  const itemHandler = async (operation: "+" | "-") => {
    if (!targetItem || !cartTargetItem) return;

    try {
      const itemRef = doc(
        db,
        "users",
        user.uid,
        "cartItems",
        String(cartTargetItem.productId)
      );

      if (operation === "+") {
        await updateDoc(itemRef, {
          quantity: cartTargetItem.quantity + 1,
        });
      } else if (operation === "-") {
        if (cartTargetItem.quantity > 1) {
          await updateDoc(itemRef, {
            quantity: cartTargetItem.quantity - 1,
          });
        } else {
          await deleteDoc(itemRef);
        }
      }

      await refreshCart();
    } catch (error) {
      console.error("Error updating cart item:", error);
      Alert.alert("Error", "Failed to update cart item.");
    }
  };

  const deleteItem = async () => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            const itemRef = doc(
              db,
              "users",
              user.uid,
              "cartItems",
              String(id)
            );
            await deleteDoc(itemRef);
            await refreshCart();
          } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert("Error", "Failed to remove item from cart.");
          }
        },
      },
    ]);
  };

  if (!targetItem || !cartTargetItem) return null;

  return (
    <View className="bg-[#1C1C1E] mx-5 my-3 p-5 gap-10 flex-row relative rounded-xl">
      <Image
        className="rounded-xl"
        source={{ uri: targetItem.image }}
        resizeMode="cover"
        style={{ width: 70, height: 70 }}
      />

      <View className="flex-col items-start">
        <Text className="text-white font-bold w-52 line-clamp-1 text-xl">
          {targetItem.title}
        </Text>

        {(cartTargetItem.size || cartTargetItem.color) && (
          <View className="flex-row mt-2 items-center gap-3">
            {cartTargetItem.size && (
              <Text className="text-gray-400">Size: {cartTargetItem.size}</Text>
            )}
            {cartTargetItem.color && (
              <Text className="text-gray-400">Color: {cartTargetItem.color}</Text>
            )}
          </View>
        )}

        <Text className="text-white font-bold text-xl mt-2">
          ${targetItem.price}
        </Text>

        <View className="flex-row items-center mt-2 gap-5">
          <TouchableOpacity onPress={() => itemHandler("-")}>
            <Text className="p-3 rounded-md text-xl bg-slate-800 text-gray-400">
              -
            </Text>
          </TouchableOpacity>

          <Text className="text-white text-2xl">{cartTargetItem.quantity}</Text>

          <TouchableOpacity onPress={() => itemHandler("+")}>
          {/* <TouchableOpacity onPress={proba}> */}
            <Text className="p-3 text-xl rounded-md bg-slate-800 text-gray-400">
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="absolute right-3 top-3"
        onPress={deleteItem}
      >
        <Feather name="trash-2" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}
