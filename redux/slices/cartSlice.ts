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
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    updateItem: (state, action) => {
      const updated = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        state.cartItems[index] = updated;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteCart: (state, action) => {
        state.cartItems = [];
    }
  },
});

export const { setCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
