"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus, deleteOrder } from "@/redux/slices/orderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const STATUS_OPTIONS = [
  { id: 'Pending', label: 'Pending', color: 'bg-amber-500', text: 'text-amber-900', bg: 'bg-amber-50' },
  { id: 'Shipped', label: 'Shipped', color: 'bg-blue-500', text: 'text-blue-900', bg: 'bg-blue-50' },
  { id: 'Delivered', label: 'Delivered', color: 'bg-emerald-500', text: 'text-emerald-900', bg: 'bg-emerald-50' },
  { id: 'Cancelled', label: 'Cancelled', color: 'bg-rose-500', text: 'text-rose-900', bg: 'bg-rose-50' }
];

function StatusDropdown({ currentStatus, onStatusChange, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeStatus = STATUS_OPTIONS.find(opt => opt.id === currentStatus) || STATUS_OPTIONS[0];

  return (
    <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500 
          border border-zinc-100 hover:border-zinc-300 bg-white shadow-sm hover:shadow-md
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
        `}
      >
        {isLoading ? (
          <div className="w-2 h-2 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className={`w-2 h-2 rounded-full ${activeStatus.color} shadow-[0_0_8px] shadow-current`} />
        )}
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950">{activeStatus.label}</span>
        <svg 
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          className={`transition-transform duration-500 text-zinc-400 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-56 bg-white border border-zinc-100 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] overflow-hidden p-2"
            >
              <div className="px-4 py-2 mb-2 border-b border-zinc-50">
                <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-300 font-black">Assign Status</span>
              </div>
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onStatusChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 
                    ${currentStatus === option.id ? 'bg-zinc-50' : 'hover:bg-zinc-50/80'} 
                    group
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${option.color} ${currentStatus === option.id ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'} transition-opacity`} />
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${currentStatus === option.id ? 'text-black' : 'text-zinc-400 group-hover:text-zinc-600'}`}>
                      {option.label}
                    </span>
                  </div>
                  {currentStatus === option.id && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminOrders() {
    const dispatch = useDispatch();
    const { list: orders, loading, error } = useSelector((state) => state.orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             order.city?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        try {
            await dispatch(updateOrderStatus({ 
                orderId, 
                status: newStatus
            })).unwrap();
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = (e, orderId) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this order?")) {
            dispatch(deleteOrder(orderId));
        }
    };

    return (
        <div className="p-8 space-y-12 bg-white min-h-screen">
            <header className="flex flex-col gap-8">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-[1px] w-12 bg-zinc-950" />
                            <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-400 font-bold">Maison Arabi</span>
                        </div>
                        <h1 className="text-5xl font-serif italic tracking-tight text-zinc-950">Grand Archive</h1>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mt-4 font-medium italic">Manage customer masterworks</p>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-3xl text-center">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-1">Active Essence</p>
                        <p className="text-2xl font-serif font-black text-zinc-950">{filteredOrders.length}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative group w-full max-w-md">
                        <input 
                            type="text"
                            placeholder="Search by customer or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-14 text-xs outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all font-medium"
                        />
                        <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            {['all', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-6 py-2.5 rounded-full text-[9px] uppercase tracking-widest font-black transition-all duration-500 border ${
                                        statusFilter === status 
                                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xl shadow-zinc-200' 
                                        : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {loading && !updatingId ? (
                <div className="h-[50vh] flex flex-col items-center justify-center gap-6">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-b-2 border-zinc-950 rounded-full" />
                </div>
            ) : (
                <>
            <div className="hidden lg:block">
                <table className="w-full text-left border-separate border-spacing-y-6">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-[0.4em] text-zinc-300 font-black">
                            <th className="px-8 pb-4">Customer</th>
                            <th className="px-8 pb-4">Timeline</th>
                            <th className="px-8 pb-4">Essence Qty</th>
                            <th className="px-8 pb-4 text-right">Value</th>
                            <th className="px-8 pb-4 text-center">Status Action</th>
                            <th className="px-8 pb-4 text-right">Removal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <motion.tr 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl group hover:shadow-xl transition-all cursor-pointer border border-zinc-50"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <td className="px-8 py-7 rounded-l-[2rem]">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-zinc-950">{order.full_name}</span>
                                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{order.city}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-7 text-[11px] font-bold text-zinc-900">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-7">
                                    <span className="text-xs font-black text-zinc-950 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
                                        {order.items?.length || 0} items
                                    </span>
                                </td>
                                <td className="px-8 py-7 text-right">
                                    <span className="text-base font-serif italic font-black text-zinc-950">
                                        {order.total_amount} MAD
                                    </span>
                                </td>
                                <td className="px-8 py-7 text-center" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-center">
                                        <StatusDropdown 
                                            currentStatus={order.status} 
                                            isLoading={updatingId === order.id}
                                            onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)} 
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-7 rounded-r-[2rem] text-right" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        onClick={(e) => handleDelete(e, order.id)}
                                        className="p-2 text-zinc-300 hover:text-rose-600 transition-all"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-6">
                {filteredOrders.map((order) => (
                    <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-[2.5rem] p-8 space-y-6 border border-zinc-100 shadow-sm"
                        onClick={() => setSelectedOrder(order)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-zinc-950 tracking-tight">{order.full_name}</h3>
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{order.city}</p>
                            </div>
                            <span className="px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border bg-zinc-50 text-zinc-950">
                                {order.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-6 border-y border-zinc-50">
                            <div>
                                <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-2">Total</p>
                                <p className="text-xl font-serif italic text-zinc-950">{order.total_amount} MAD</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-2">Date</p>
                                <p className="text-xs font-bold text-zinc-900">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <StatusDropdown 
                                    currentStatus={order.status} 
                                    isLoading={updatingId === order.id}
                                    onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)} 
                                />
                            </div>
                            <button 
                                onClick={(e) => handleDelete(e, order.id)}
                                className="w-14 h-14 flex items-center justify-center bg-rose-50 text-rose-300 hover:text-rose-600 rounded-3xl transition-all"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
                </>
            )}

            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md z-[200]"
                        />
                        <motion.div 
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-[210] shadow-2xl p-16 overflow-y-auto"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div>
                                    <h2 className="text-4xl font-serif italic mb-4">Essence Identity</h2>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Archive Reference: {selectedOrder.id}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-all">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <section className="space-y-16">
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-950 mb-8">Customer Intelligence</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
                                        <div>
                                            <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-3">Legal Name</p>
                                            <p className="text-sm font-bold text-zinc-950">{selectedOrder.full_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-3">Communication</p>
                                            <p className="text-sm font-bold text-zinc-950">{selectedOrder.phone}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-3">Email Repository</p>
                                            <p className="text-sm font-bold text-zinc-950">{selectedOrder.email}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-3">Logistics Destination</p>
                                            <p className="text-sm leading-relaxed font-medium">{selectedOrder.address}, {selectedOrder.city}</p>
                                        </div>
                                        {selectedOrder.notes && (
                                            <div className="md:col-span-2">
                                                <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-black mb-3">Notes</p>
                                                <p className="text-xs italic text-zinc-500 bg-white p-4 rounded-2xl border border-zinc-100">"{selectedOrder.notes}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-950 mb-8">Ordered Elixirs</h3>
                                    <div className="space-y-6">
                                        {selectedOrder.items?.map((item) => (
                                            <div key={item.id} className="flex gap-6 items-center bg-white border border-zinc-100 p-6 rounded-[2rem]">
                                                <div className="w-20 h-20 overflow-hidden rounded-2xl bg-zinc-50">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-zinc-950 tracking-tight">{item.title}</p>
                                                    <p className="text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-bold mt-2">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-black text-zinc-950">{item.totalPrice} MAD</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-12 border-t border-zinc-100">
                                    <div className="flex justify-between items-center bg-zinc-950 p-10 rounded-[3rem] text-white">
                                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500">Grand Total</p>
                                        <p className="text-4xl font-serif italic">{selectedOrder.total_amount} MAD</p>
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
