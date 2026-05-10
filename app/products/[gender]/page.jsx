"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Cards from "@/app/components/Cards";
import { motion, AnimatePresence } from "framer-motion";

export default function GenderProductPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { gender } = params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [gender, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/products/GetProducts?gender=${gender}&sort=${sortBy}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 md:p-8 pt-32">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gray-100 pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-4 capitalize italic tracking-tight">
              {gender}&apos;s Collection
            </h1>
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-black" />
              <p className="text-gray-400 uppercase text-[10px] tracking-[0.4em]">
                Authentic Arabi Masterpieces
              </p>
            </div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 mt-8 md:mt-0">
            {/* SEARCH */}
            <div className="relative group min-w-[200px]">
              <input
                type="text"
                placeholder="Search Collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-gray-100 py-2 text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              />
              <svg 
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute right-0 top-3 text-gray-300 group-focus-within:text-black transition-colors"
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end gap-2">
                <span className="text-[8px] uppercase tracking-[0.3em] text-gray-400">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border-none text-[10px] uppercase tracking-[0.2em] font-medium focus:ring-0 cursor-pointer text-right outline-none hover:text-gray-400 transition-colors"
                >
                  <option value="newest">New Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
                {filteredProducts.length} Items
              </div>
            </div>
          </div>
        </header>

        {/* PRODUCTS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={gender}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
          >
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-50 rounded-lg mb-6" />
                  <div className="h-4 bg-gray-50 w-2/3 mb-3" />
                  <div className="h-4 bg-gray-50 w-1/3" />
                </div>
              ))
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Cards product={product} isAdmin={false} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && !loading && (
          <div className="h-[40vh] flex flex-col items-center justify-center">
            <p className="font-serif italic text-2xl text-gray-300">
              {searchQuery ? `No results found for "${searchQuery}"` : "The collection is currently evolving..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
