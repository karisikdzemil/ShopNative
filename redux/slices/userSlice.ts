import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  uid: string | null;
  email: string | null;
  fullName: string | null;
  savedItems: [];
}


const initialState: UserState = {
  uid: null,
  email: null,
  fullName: null,
  savedItems: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; email: string; fullName: string | null; savedItems: [] }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.savedItems = action.payload.savedItems;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.fullName = null;
      state.savedItems = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
