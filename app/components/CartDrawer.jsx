"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/slices/uiSlice";
import { cartActions } from "../../redux/slices/cartSlice";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.ui.cartVisible);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartHandler}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif tracking-tight">Shopping Bag</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mt-1">Maison Arabi</p>
              </div>
              <button 
                onClick={toggleCartHandler}
                className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ITEMS LIST */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-500 font-light italic">Your bag is currently empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-32 bg-zinc-50 overflow-hidden rounded-lg">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-900 mb-2">{item.title}</h3>
                        <div className="flex items-center border border-zinc-100 rounded-lg overflow-hidden w-fit">
                          <button 
                            onClick={() => dispatch(cartActions.removeFromCart(item.id))}
                            className="p-1.5 hover:bg-zinc-50 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M5 12h14" />
                            </svg>
                          </button>
                          <span className="text-[10px] font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(cartActions.addToCart(item))}
                            className="p-1.5 hover:bg-zinc-50 transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-sm font-bold">{item.price} <span className="text-[10px] font-normal text-zinc-400">MAD</span></p>
                        <button 
                          onClick={() => dispatch(cartActions.removeFromCart(item.id))}
                          className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-zinc-50 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Subtotal</span>
                  <span className="text-xl font-serif">{totalAmount} <span className="text-xs font-sans">MAD</span></span>
                </div>
                <button className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-black/10">
                  Proceed to Checkout
                </button>
                <p className="text-[9px] text-center text-zinc-400 tracking-wider">Shipping & taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
