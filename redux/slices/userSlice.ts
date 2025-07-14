import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  fullName: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  fullName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; email: string; fullName: string | null }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.fullName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
