import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    isSending: {},
    isShaking: false,
  },
  reducers: {
    startSending: (state, action) => {
      state.isSending[action.payload] = true;
    },
    stopSending: (state, action) => {
      state.isSending[action.payload] = false;
    },
    startShaking: (state) => {
      state.isShaking = true;
    },
    stopShaking: (state) => {
      state.isShaking = false;
    },
  },
});

export const { startSending, startShaking, stopSending, stopShaking } =
  addToCartSlice.actions;

export default addToCartSlice.reducer;
