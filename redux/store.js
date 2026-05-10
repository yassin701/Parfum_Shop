import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import uiSlice from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
