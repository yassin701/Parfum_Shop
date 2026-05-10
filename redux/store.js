import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import uiSlice from "./slices/uiSlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
