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

    return (
        <div className="min-h-screen bg-zinc-50 selection:bg-zinc-950 selection:text-white">
            <UserNavbar />
            
            <main className="container-responsive mx-auto section-padding-lg">
                {/* COLLECTION HEADER - FULLY RESPONSIVE */}
                <header className="mb-responsive-xl flex flex-col-responsive-between gap-responsive-lg">
                    <div className="space-y-responsive-md">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-responsive-md"
                        >
                            <div className="h-[1px] w-responsive min-w-8 bg-zinc-300" />
                            <span className="text-sm-responsive uppercase tracking-[0.5em] text-zinc-400 font-black whitespace-nowrap">
                                Catalog / {gender} / {type}
                            </span>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="heading-xl-responsive font-serif italic text-zinc-900"
                        >
                            {gender === 'men' ? tGen("men") : tGen("women")} <br className="hidden sm:block" />
                            <span className="text-zinc-300 font-light not-italic">{type === 'deconte' ? t("deconte") : t("complet")}</span> {t("collection")}
                        </motion.h1>
                    </div>

                    {/* SEARCH BOX - RESPONSIVE SIZING */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative group w-full md:max-w-sm flex-shrink-0"
                    >
                        <input 
                            type="text"
                            placeholder={t("search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-responsive-lg py-responsive-md px-responsive-md pl-responsive-lg text-base outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-950 transition-all shadow-responsive-sm group-hover:shadow-responsive-md"
                            aria-label="Search products"
                        />
                        <svg
                            className="absolute left-responsive-md top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-950 transition-colors pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </motion.div>
                </header>

                {/* PRODUCT GRID - FULLY RESPONSIVE & FLUID */}
                <div className="relative">
                    {loading ? (
                        // Loading skeleton grid - responsive columns
                        <div className="grid-cols-fluid-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-responsive-product bg-white rounded-responsive-lg animate-pulse"
                                />
                            ))}
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredProducts.length > 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid-cols-fluid-4"
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
                                    className="flex flex-col items-center justify-center py-responsive-xl text-center"
                                >
                                    <div className="w-20 h-20 bg-white rounded-responsive-lg mb-responsive-lg flex items-center justify-center shadow-responsive-sm border border-zinc-100">
                                        <svg
                                            className="w-10 h-10 text-zinc-200"
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
                                    <h3 className="heading-lg-responsive font-bold text-zinc-900 mb-responsive-md">
                                        {t("no_results")}
                                    </h3>
                                    <p className="text-responsive text-zinc-400">
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
