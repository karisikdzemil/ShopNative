import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { productId, color, size } = action.payload;

      const existingIndex = state.cartItems.findIndex(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );

      if (existingIndex !== -1) {
        state.cartItems[existingIndex].quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },

    removeItem: (state, action: PayloadAction<{ productId: number; color?: string; size?: string }>) => {
      const { productId, color, size } = action.payload;

      const existingIndex = state.cartItems.findIndex(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );

      if (existingIndex !== -1) {
        if (state.cartItems[existingIndex].quantity > 1) {
          state.cartItems[existingIndex].quantity -= 1;
        } else {
          state.cartItems.splice(existingIndex, 1);
        }
      }
    },

    deleteCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, removeItem, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
