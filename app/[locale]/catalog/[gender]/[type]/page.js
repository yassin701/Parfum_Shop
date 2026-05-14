"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import UserNavbar from "@/app/[locale]/components/UserNavbar";
import ProductCard from "@/app/[locale]/components/Cards";
import { useTranslations } from "next-intl";

export default function ProductListPage({ params }) {
    const { gender, type } = use(params);
    const t = useTranslations("ProductList");
    const tGen = useTranslations("Products");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/products/GetProducts?gender=${gender}&type=${type}`);
                setProducts(res.data);
            } catch (err) {

            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [gender, type]);

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white selection:bg-zinc-950 selection:text-white">
            <UserNavbar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 lg:pt-32 pb-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gray-100 pb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif mb-4 italic tracking-tight text-zinc-900 capitalize">
                            {gender === "men" ? tGen("men") : tGen("women")}{" "}
                            <span className="text-zinc-300 font-light not-italic">
                                {type === "deconte" ? t("deconte") : t("complet")}
                            </span>{" "}
                            <span className="font-light not-italic text-zinc-900">{t("collection")}</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-black" />
                            <p className="text-gray-400 uppercase text-[10px] tracking-[0.4em]">
                                Catalog / {gender} / {type}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative group min-w-[200px] w-full md:w-auto mt-8 md:mt-0"
                    >
                        <input
                            type="text"
                            placeholder={t("search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-b border-gray-100 py-2 pr-8 text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                            aria-label="Search products"
                        />
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="absolute right-0 top-3 text-gray-300 group-focus-within:text-black transition-colors pointer-events-none"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </motion.div>
                </header>

                {/* PRODUCT GRID - FULLY RESPONSIVE & FLUID */}
                <div className="relative">
                    {loading ? (
                        // Loading skeleton grid - responsive columns
                       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-[3/4] bg-white rounded-2xl animate-pulse border border-zinc-100"
                                />
                            ))}
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredProducts.length > 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                   className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
                                >
                                    {filteredProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="h-full"
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center border border-gray-100">
                                        <svg
                                            className="w-10 h-10 text-gray-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 mb-3">
                                        {t("no_results")}
                                    </h3>
                                    <p className="text-sm text-gray-400 max-w-md">
                                        {t("empty_desc")}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </main>
        </div>
    );
}
