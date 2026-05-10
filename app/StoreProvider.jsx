"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import CartPersistor from "./CartPersistor";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <CartPersistor />
      {children}
    </Provider>
  );
}
