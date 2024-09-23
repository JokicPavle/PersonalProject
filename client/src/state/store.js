import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "..//state/cartProducts";
import addToCartAnimation from "./addToCartAnimation";
import { thunk } from "redux-thunk";
export const store = configureStore({
  reducer: {
    cartProducts: productsReducer,
    addToCart: addToCartAnimation,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
