import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;

}

export interface PaymentMethod {
  method: "Card" | "PayPal";
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  email?: string; 
}


interface UserState {
  uid: string | null;
  email: string | null;
  fullName: string | null;
  savedItems: any[];
  address: Address | null;
  paymentMethods: PaymentMethod[];
}

const initialState: UserState = {
  uid: null,
  email: null,
  fullName: null,
  savedItems: [],
  address: null,
  paymentMethods: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        fullName: string | null;
        savedItems: any[];
        address: Address | null;
        paymentMethods: PaymentMethod[];
      }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.savedItems = action.payload.savedItems;
      state.address = action.payload.address;
      state.paymentMethods = action.payload.paymentMethods;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.fullName = null;
      state.savedItems = [];
      state.address = null;
      state.paymentMethods = [];
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
  },
});

export const { setUser, clearUser, addPaymentMethod, addAddress } = userSlice.actions;
export default userSlice.reducer;
