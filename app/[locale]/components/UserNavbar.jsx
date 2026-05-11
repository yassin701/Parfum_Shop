"use client";

import { useState, useEffect } from "react";
import { Link } from "@/routing";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../redux/slices/uiSlice";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function UserNavbar() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const t = useTranslations("Navigation");
  const tList = useTranslations("ProductList");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] h-20 md:h-24 flex items-center transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 backdrop-blur-2xl shadow-xl border-b border-zinc-100 text-black" 
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="group flex flex-col items-center">
          <span className="text-xl md:text-2xl font-serif tracking-[0.3em] font-light group-hover:tracking-[0.4em] transition-all duration-500">
            ARABI SHOP
          </span>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] -mt-1 transition-colors opacity-60">
            {t("brand_sub")}
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="/catalog"
            className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all relative group"
          >
            {t("catalog")}
            <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full bg-black`} />
          </Link>

          {/* MEN DROPDOWN */}
          <div className="relative group/menu">
            <Link
              href="/catalog/men"
              className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all flex items-center gap-1"
            >
              {t("men")}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/menu:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 transform translate-y-2 group-hover/menu:translate-y-0">
              <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-2xl p-6 shadow-2xl min-w-[200px] flex flex-col gap-4 text-black">
                <Link href="/catalog/men/complet" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("complet")} Collection</Link>
                <Link href="/catalog/men/deconte" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("deconte")} Parfum</Link>
              </div>
            </div>
          </div>

          {/* WOMEN DROPDOWN */}
          <div className="relative group/menu">
            <Link
              href="/catalog/women"
              className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all flex items-center gap-1"
            >
              {t("women")}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/menu:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 transform translate-y-2 group-hover/menu:translate-y-0">
              <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-2xl p-6 shadow-2xl min-w-[200px] flex flex-col gap-4 text-black">
                <Link href="/catalog/women/complet" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("complet")} Collection</Link>
                <Link href="/catalog/women/deconte" className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("deconte")} Parfum</Link>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="text-[10px] uppercase tracking-[0.3em] font-light hover:opacity-50 transition-all relative group"
          >
            {t("contact")}
            <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full bg-black`} />
          </Link>
        </nav>

        {/* ICONS */}
        <div className="flex items-center gap-4 md:gap-8">
          <LanguageSwitcher />

          <Link
            href="/Admin/Login"
            className="hover:scale-110 transition-transform duration-300 text-zinc-900"
            title="Admin Login"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
            <span className={`absolute -top-2 -right-2 text-[8px] w-4 h-4 flex items-center justify-center rounded-full bg-black text-white`}>
              {totalQuantity}
            </span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover:rotate-90 transition-transform duration-500 p-2"
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
            className="fixed inset-0 z-[250] h-[100dvh] bg-white text-black flex flex-col p-8 pt-12 justify-start overflow-y-auto"
          >
            {/* MENU HEADER */}
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-serif tracking-[0.3em] font-light">ARABI SHOP</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-500"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-10 w-full max-w-sm">
              <Link href="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif italic tracking-tighter hover:text-black/50 transition-colors">{t("all_collections")}</Link>
              
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-black/30 font-bold">{t("men")}</span>
                <div className="flex flex-col gap-5 ml-4">
                  <Link href="/catalog/men/complet" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-600 transition-colors">{tList("complet")} Collection</Link>
                  <Link href="/catalog/men/deconte" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-600 transition-colors">{tList("deconte")} Parfum</Link>
                </div>
              </div>

              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-black/30 font-bold">{t("women")}</span>
                <div className="flex flex-col gap-5 ml-4">
                  <Link href="/catalog/women/complet" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-600 transition-colors">{tList("complet")} Collection</Link>
                  <Link href="/catalog/women/deconte" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light hover:text-amber-600 transition-colors">{tList("deconte")} Parfum</Link>
                </div>
              </div>

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif italic tracking-tighter hover:text-black/50 transition-colors pt-4">{t("contact")}</Link>
            </div>

            <div className="mt-auto pt-12 pb-8 border-t border-black/5 flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-black/30">Maison Arabi Shop</span>
              <div className="flex gap-8">
                <span className="text-sm font-light hover:opacity-50 cursor-pointer transition-opacity">Instagram</span>
                <span className="text-sm font-light hover:opacity-50 cursor-pointer transition-opacity">Twitter</span>
              </div>
              <Link 
                href="/Admin/Login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mt-4 hover:text-black transition-colors"
              >
                Admin Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
