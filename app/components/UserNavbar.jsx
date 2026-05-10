"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/slices/uiSlice";

export default function UserNavbar() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${isScrolled ? "bg-white/80 backdrop-blur-2xl py-4 shadow-2xl border-b border-black/5" : "bg-transparent py-8"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-black">
        {/* LOGO */}
        <Link href="/" className="group flex flex-col items-center">
          <span className="text-2xl font-serif tracking-[0.3em] font-light group-hover:tracking-[0.4em] transition-all duration-500">
            ARABI SHOP
          </span>
          <span className={`text-[9px] uppercase tracking-[0.6em] -mt-1 transition-colors ${isScrolled ? "text-gray-500" : "text-white/40"
            }`}>
            Maison de Parfum
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="/catalog"
            className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all relative group"
          >
            Collections
            <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${isScrolled ? "bg-black" : "bg-white"}`} />
          </Link>

          {/* MEN DROPDOWN */}
          <div className="relative group/menu">
            <Link
              href="/catalog/men"
              className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all flex items-center gap-1"
            >
              Men
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/menu:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 transform translate-y-2 group-hover/menu:translate-y-0">
              <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-2xl p-6 shadow-2xl min-w-[200px] flex flex-col gap-4">
                <Link href="/catalog/men/complet" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">Parfum Complet</Link>
                <Link href="/catalog/men/deconte" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">Déconté Parfum</Link>
              </div>
            </div>
          </div>

          {/* WOMEN DROPDOWN */}
          <div className="relative group/menu">
            <Link
              href="/catalog/women"
              className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all flex items-center gap-1"
            >
              Women
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/menu:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 transform translate-y-2 group-hover/menu:translate-y-0">
              <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-2xl p-6 shadow-2xl min-w-[200px] flex flex-col gap-4">
                <Link href="/catalog/women/complet" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">Parfum Complet</Link>
                <Link href="/catalog/women/deconte" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">Déconté Parfum</Link>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all relative group"
          >
            Contact
            <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${isScrolled ? "bg-black" : "bg-white"}`} />
          </Link>
        </nav>

        {/* ICONS */}
        <div className="flex items-center gap-8">
          <button className="hover:scale-110 transition-transform duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <Link href="/Admin/Login" className="hover:scale-110 transition-transform duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <button
            onClick={() => dispatch(uiActions.toggle())}
            className="relative hover:scale-110 transition-transform duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className={`absolute -top-2 -right-2 text-[8px] w-4 h-4 flex items-center justify-center rounded-full transition-colors ${isScrolled ? "bg-black text-white" : "bg-white text-black"
              }`}>
              {totalQuantity}
            </span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover:rotate-90 transition-transform duration-500"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d={isMobileMenuOpen ? "M18 6 6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-black text-white flex flex-col p-12 justify-center"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] pr-4">
              <Link href="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif italic tracking-tighter hover:text-white/50 transition-colors">All Collections</Link>
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">Men</span>
                <div className="flex flex-col gap-4 ml-4">
                  <Link href="/catalog/men/complet" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-400 transition-colors">Parfum Complet</Link>
                  <Link href="/catalog/men/deconte" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-400 transition-colors">Déconté Parfum</Link>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">Women</span>
                <div className="flex flex-col gap-4 ml-4">
                  <Link href="/catalog/women/complet" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-400 transition-colors">Parfum Complet</Link>
                  <Link href="/catalog/women/deconte" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-400 transition-colors">Déconté Parfum</Link>
                </div>
              </div>

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif italic tracking-tighter hover:text-white/50 transition-colors mt-4">Contact</Link>
            </div>

            <div className="mt-20 border-t border-white/10 pt-10 flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">Maison Arabi Shop</span>
              <div className="flex gap-6">
                <span className="text-xs font-light">Instagram</span>
                <span className="text-xs font-light">Twitter</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
