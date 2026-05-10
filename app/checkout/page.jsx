"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import UserNavbar from "@/app/components/UserNavbar";

import { cartActions } from "@/redux/slices/cartSlice";

export default function CheckoutPage() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        notes: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await axios.post("/api/orders", {
                ...formData,
                items: cart.items,
                totalAmount: cart.totalAmount
            });

            if (response.data) {
                // Clear cart upon success
                dispatch(cartActions.clearCart());
                setIsSuccess(true);
            }
        } catch (err) {
            console.error("Failed to place order:", err);
            alert("Could not place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.items.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
                <UserNavbar />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-serif italic mb-6">Your bag is empty</h1>
                    <Link href="/catalog" className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors">
                        Discover the Collection
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 selection:bg-black selection:text-white pb-20">
            <UserNavbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div 
                            key="checkout"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
                        >
                            {/* FORM SECTION */}
                            <div className="lg:col-span-7 space-y-12">
                                <header>
                                    <h1 className="text-5xl font-serif italic text-zinc-900 mb-2">Checkout</h1>
                                    <p className="text-zinc-400 text-sm">Secure your artisanal masterwork.</p>
                                </header>

                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <section className="space-y-6">
                                        <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-300">Contact Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Full Name</label>
                                                <input 
                                                    type="text" required name="fullName" value={formData.fullName} onChange={handleChange}
                                                    className="w-full bg-white border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-zinc-900 transition-all outline-none"
                                                    placeholder="e.g. Adam Smith"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Phone Number</label>
                                                <input 
                                                    type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                                                    className="w-full bg-white border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-zinc-900 transition-all outline-none"
                                                    placeholder="+212 6..."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Email Address</label>
                                            <input 
                                                type="email" required name="email" value={formData.email} onChange={handleChange}
                                                className="w-full bg-white border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-zinc-900 transition-all outline-none"
                                                placeholder="signature@example.com"
                                            />
                                        </div>
                                    </section>

                                    <section className="space-y-6">
                                        <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-300">Shipping Essence</h2>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Delivery Address</label>
                                            <input 
                                                type="text" required name="address" value={formData.address} onChange={handleChange}
                                                className="w-full bg-white border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-zinc-900 transition-all outline-none"
                                                placeholder="Street, Building, Apartment..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">City</label>
                                                <input 
                                                    type="text" required name="city" value={formData.city} onChange={handleChange}
                                                    className="w-full bg-white border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-zinc-900 transition-all outline-none"
                                                    placeholder="Casablanca"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Order Notes (Optional)</label>
                                                <input 
                                                    type="text" name="notes" value={formData.notes} onChange={handleChange}
                                                    className="w-full bg-white border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-zinc-900 transition-all outline-none"
                                                    placeholder="Gift wrap? Gate code?"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <div className="pt-6">
                                        <button 
                                            disabled={isSubmitting}
                                            className="w-full bg-zinc-950 text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.5em] hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-2xl shadow-zinc-200 disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Orchestrating..." : "Finalize Order"}
                                        </button>
                                        <p className="text-center text-[9px] text-zinc-400 mt-6 uppercase tracking-widest">
                                            Pay with Cash upon delivery
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* SUMMARY SECTION */}
                            <div className="lg:col-span-5 lg:sticky lg:top-40">
                                <div className="bg-white rounded-3xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-zinc-100">
                                    <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-950 mb-8 border-b border-zinc-50 pb-4">Order Summary</h2>
                                    <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-16 h-16 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xs font-bold text-zinc-900">{item.title}</h3>
                                                    <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-xs font-bold text-zinc-900">
                                                    {item.totalPrice} <span className="text-[8px] uppercase">mad</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-zinc-50 space-y-4">
                                        <div className="flex justify-between items-center text-xs text-zinc-400 uppercase tracking-widest">
                                            <span>Subtotal</span>
                                            <span>{cart.totalAmount} MAD</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-zinc-400 uppercase tracking-widest">
                                            <span>Delivery</span>
                                            <span className="text-emerald-600 font-bold">Free</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-950">Total</span>
                                            <span className="text-2xl font-serif italic text-zinc-950">{cart.totalAmount} MAD</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex items-center justify-center gap-4 text-[8px] uppercase tracking-[0.3em] text-zinc-300 font-black">
                                    <div className="h-[1px] flex-1 bg-zinc-100" />
                                    <span>Verified Luxury</span>
                                    <div className="h-[1px] flex-1 bg-zinc-100" />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-40 text-center"
                        >
                            <div className="w-24 h-24 bg-zinc-950 text-white rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-zinc-200">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif italic text-zinc-900 mb-6">Thank You</h1>
                            <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed mb-12">
                                Your order has been placed successfully. A concierge will contact you shortly to confirm the delivery details.
                            </p>
                            <Link href="/catalog" className="px-12 py-5 bg-zinc-950 text-white text-[10px] uppercase tracking-[0.5em] font-black rounded-full hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-200">
                                Return to Gallery
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
