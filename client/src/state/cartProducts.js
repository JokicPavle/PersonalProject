import { createSlice } from "@reduxjs/toolkit";

const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id != action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else if (product) {
        return state.filter((item) => item.id !== action.payload);
      }
    },
    getTotalQuantity: (state) => {
      return state.reduce((total, item) => total + item.quantity, 0);
    },
  },
});
export const addProductAsync = (product) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addProduct(product));
    }, 1000);
  };
};
export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  getTotalQuantity,
} = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
