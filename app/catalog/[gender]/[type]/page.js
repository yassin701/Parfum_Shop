"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import UserNavbar from "@/app/components/UserNavbar";
import ProductCard from "@/app/components/Cards";

export default function ProductListPage({ params }) {
    const { gender, type } = use(params);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/products/GetProducts?gender=${gender}&type=${type}`);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [gender, type]);

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const title = `${gender === 'men' ? "Men's" : "Women's"} ${type === 'deconte' ? 'Déconté' : 'Complete'} Collection`;

    return (
        <div className="min-h-screen bg-zinc-50 selection:bg-zinc-950 selection:text-white">
            <UserNavbar />
            
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                {/* COLLECTION HEADER */}
                <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className="h-[1px] w-8 md:w-12 bg-zinc-300" />
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-400 font-black">
                                Catalog / {gender} / {type}
                            </span>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-serif italic text-zinc-900 leading-tight"
                        >
                            {gender === 'men' ? "Men's" : "Women's"} <br />
                            <span className="text-zinc-300 font-light not-italic">{type === 'deconte' ? 'Déconté' : 'Complete'}</span> Collection
                        </motion.h1>
                    </div>

                    {/* SEARCH BOX */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative group w-full md:w-80"
                    >
                        <input 
                            type="text"
                            placeholder="Search masterpiece..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-2xl py-4 px-6 pl-14 text-sm outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-950 transition-all shadow-sm group-hover:shadow-md"
                        />
                        <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-950 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </motion.div>
                </header>

                {/* PRODUCT GRID */}
                <div className="relative">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="aspect-[3/4] bg-white rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredProducts.length > 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                >
                                    {filteredProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-40 text-center"
                                >
                                    <div className="w-20 h-20 bg-white rounded-3xl mb-8 flex items-center justify-center shadow-sm border border-zinc-100">
                                        <svg className="w-10 h-10 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">No masterworks found.</h3>
                                    <p className="text-zinc-400">This specific collection is currently being curated.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </main>
        </div>
    );
}
