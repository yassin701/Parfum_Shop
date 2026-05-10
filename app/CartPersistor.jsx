"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

export default function CartPersistor() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isInitial = useRef(true);

  // 1. LOAD FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const savedCart = localStorage.getItem("arabi_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch(cartActions.replaceCart(parsedCart));
      } catch (e) {
        console.error("Failed to parse cart from storage", e);
      }
    }
  }, [dispatch]);

  // 2. SAVE TO LOCALSTORAGE ON CHANGES
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    
    localStorage.setItem("arabi_cart", JSON.stringify(cart));
  }, [cart]);

  return null; // This component handles logic only
}
