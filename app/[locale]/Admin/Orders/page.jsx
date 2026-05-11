"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus, deleteOrder } from "@/redux/slices/orderSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminOrders() {
    const dispatch = useDispatch();
    const { list: orders, loading, error } = useSelector((state) => state.orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             order.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };

    const handleDelete = (e, orderId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this order?")) {
            dispatch(deleteOrder(orderId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Delivered': return 'bg-emerald-100 text-emerald-700';
            case 'Cancelled': return 'bg-rose-100 text-rose-700';
            default: return 'bg-zinc-100 text-zinc-700';
        }
    };

    return (
        <div className="p-8 space-y-8 bg-white min-h-screen">
            <header className="flex flex-col gap-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-serif tracking-tight">Order Stocker</h1>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mt-2">Manage customer masterworks</p>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                        {filteredOrders.length} Orders Found
                    </div>
                </div>

                {/* FILTERS BAR */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                    <div className="md:col-span-2 relative group">
                        <input 
                            type="text"
                            placeholder="Search by customer or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-xl py-3 px-12 text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </header>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
                </div>
            ) : (
                <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                            <th className="px-6 pb-2 font-black">Customer</th>
                            <th className="px-6 pb-2 font-black">Date</th>
                            <th className="px-6 pb-2 font-black">Items</th>
                            <th className="px-6 pb-2 font-black">Total</th>
                            <th className="px-6 pb-2 font-black">Status</th>
                            <th className="px-6 pb-2 font-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <motion.tr 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-zinc-50 rounded-2xl group hover:shadow-xl hover:shadow-zinc-100 transition-all cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <td className="px-6 py-5 rounded-l-2xl">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-zinc-900">{order.full_name}</span>
                                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest leading-loose">{order.city}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-xs text-zinc-500 font-medium">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-5 text-xs font-bold text-zinc-900">
                                    {order.items?.length || 0} Products
                                </td>
                                <td className="px-6 py-5 text-sm font-black text-zinc-950">
                                    {order.total_amount} <span className="text-[10px]">MAD</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 rounded-r-2xl" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-3">
                                        <select 
                                            value={order.status || ""}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="bg-white border border-zinc-200 text-[10px] rounded-lg p-2 outline-none focus:ring-1 focus:ring-black transition-all"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <button 
                                            onClick={(e) => handleDelete(e, order.id)}
                                            className="p-2 text-zinc-300 hover:text-rose-600 transition-colors"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="lg:hidden space-y-4">
                {filteredOrders.map((order) => (
                    <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-50 rounded-3xl p-6 space-y-4 border border-zinc-100"
                        onClick={() => setSelectedOrder(order)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-black text-zinc-900">{order.full_name}</h3>
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{order.city}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-[8px] uppercase tracking-widest font-black ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-4 border-y border-zinc-100/50">
                            <div>
                                <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Total</p>
                                <p className="text-lg font-serif italic text-zinc-950">{order.total_amount} MAD</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Date</p>
                                <p className="text-xs font-bold text-zinc-900">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
                            <select 
                                value={order.status || ""}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="flex-1 bg-white border border-zinc-100 text-[10px] font-bold rounded-xl px-4 py-3 outline-none uppercase tracking-widest"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <button 
                                onClick={(e) => handleDelete(e, order.id)}
                                className="w-12 h-12 flex items-center justify-center bg-white border border-zinc-100 text-zinc-300 hover:text-rose-600 rounded-xl transition-all"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
                </>
            )}

            {/* DETAIL MODAL */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                        />
                        <motion.div 
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-[210] shadow-2xl p-12 overflow-y-auto"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h2 className="text-3xl font-serif italic mb-2">Order Details</h2>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">ID: {selectedOrder.id}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <section className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-300 mb-4">Customer Intelligence</h3>
                                    <div className="space-y-4 bg-zinc-50 p-6 rounded-2xl">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Name</p>
                                                <p className="text-sm font-bold">{selectedOrder.full_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Phone</p>
                                                <p className="text-sm font-bold">{selectedOrder.phone}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Email</p>
                                            <p className="text-sm font-bold">{selectedOrder.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Address</p>
                                            <p className="text-xs leading-relaxed">{selectedOrder.address}, {selectedOrder.city}</p>
                                        </div>
                                        {selectedOrder.notes && (
                                            <div>
                                                <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Notes</p>
                                                <p className="text-xs italic text-zinc-600">"{selectedOrder.notes}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-300 mb-4">Essence Collection</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items?.map((item) => (
                                            <div key={item.id} className="flex gap-4 items-center bg-white border border-zinc-100 p-4 rounded-xl">
                                                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold">{item.title}</p>
                                                    <p className="text-[9px] text-zinc-400">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-xs font-black">{item.totalPrice} MAD</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-zinc-100">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-950">Grand Total</p>
                                        <p className="text-3xl font-serif italic">{selectedOrder.total_amount} MAD</p>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
