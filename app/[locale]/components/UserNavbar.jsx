"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  const t = useTranslations("Navigation");
  const tList = useTranslations("ProductList");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-[200] flex items-center transition-all duration-500 py-3 sm:py-4 px-4 sm:px-6 lg:px-8
        ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/80 backdrop-blur-2xl shadow-xl border-b border-zinc-100 text-black"
            : "bg-white text-black"
        }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center gap-4 sm:gap-6">
        {/* LOGO - RESPONSIVE */}
        <Link href="/" className="flex flex-col items-center flex-shrink-0">
          <span className="text-lg sm:text-xl md:text-2xl font-serif tracking-[0.3em] font-light leading-tight">
            ARABI SHOP
          </span>
          <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.5em] sm:tracking-[0.6em] -mt-0.5 sm:-mt-1 transition-colors opacity-60 whitespace-nowrap">
            {t("brand_sub")}
          </span>
        </Link>

        {/* DESKTOP NAV - HIDDEN ON MOBILE */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-12 flex-1 justify-center">
          <Link
            href="/catalog"
            className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.3em] font-light hover:opacity-50 transition-all relative group whitespace-nowrap"
          >
            {t("catalog")}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full bg-black" />
          </Link>

          {/* MEN DROPDOWN */}
          <div className="relative group/menu">
            <Link
              href="/catalog/men"
              className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.3em] font-light hover:opacity-50 transition-all flex items-center gap-1 whitespace-nowrap"
            >
              {t("men")}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[9px] h-[9px] lg:w-[10px] lg:h-[10px] transition-transform duration-300 group-hover/menu:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
              <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-2xl p-4 lg:p-6 shadow-2xl min-w-[180px] lg:min-w-[200px] flex flex-col gap-3 text-black">
                <Link href="/catalog/men/complet" className="text-[8px] lg:text-[9px] uppercase tracking-[0.15em] lg:tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("complet")} Collection</Link>
                <Link href="/catalog/men/deconte" className="text-[8px] lg:text-[9px] uppercase tracking-[0.15em] lg:tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("deconte")} Parfum</Link>
              </div>
            </div>
          </div>

          {/* WOMEN DROPDOWN */}
          <div className="relative group/menu">
            <Link
              href="/catalog/women"
              className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.3em] font-light hover:opacity-50 transition-all flex items-center gap-1 whitespace-nowrap"
            >
              {t("women")}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[9px] h-[9px] lg:w-[10px] lg:h-[10px] transition-transform duration-300 group-hover/menu:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-500 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
              <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-2xl p-4 lg:p-6 shadow-2xl min-w-[180px] lg:min-w-[200px] flex flex-col gap-3 text-black">
                <Link href="/catalog/women/complet" className="text-[8px] lg:text-[9px] uppercase tracking-[0.15em] lg:tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("complet")} Collection</Link>
                <Link href="/catalog/women/deconte" className="text-[8px] lg:text-[9px] uppercase tracking-[0.15em] lg:tracking-[0.2em] font-bold text-zinc-500 hover:text-zinc-950 transition-colors">{tList("deconte")} Parfum</Link>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] lg:tracking-[0.3em] font-light hover:opacity-50 transition-all relative group whitespace-nowrap"
          >
            {t("contact")}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full bg-black" />
          </Link>
        </nav>

        {/* ICONS - RESPONSIVE */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-shrink-0">
          <LanguageSwitcher />

          <Link
            href="/Admin/Login"
            className="hover:scale-110 transition-transform duration-300 text-zinc-900 p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            title="Admin Login"
            aria-label="Admin login"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <button
            onClick={() => dispatch(uiActions.toggle())}
            className="relative hover:scale-110 transition-transform duration-300 text-zinc-900 p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            aria-label="Shopping cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 text-[7px] sm:text-[8px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-black text-white font-bold">
                {totalQuantity > 9 ? '9+' : totalQuantity}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover:rotate-90 transition-transform duration-500 p-1.5 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={isMobileMenuOpen ? "M18 6 6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
            </svg>
          </button>
        </div>
      </div>
    </header>

    {mounted &&
      createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                key="mobile-menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[280] bg-black/20 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                key="mobile-menu-panel"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-[290] w-full bg-white text-black flex flex-col overflow-y-auto shadow-2xl"
              >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-zinc-100 flex-shrink-0">
                  <span className="text-lg sm:text-xl font-serif tracking-[0.3em] font-light leading-tight">ARABI SHOP</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:rotate-90 transition-transform duration-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 rounded-lg"
                    aria-label="Close menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-6 sm:gap-8 flex-1 p-4 sm:p-6 overflow-y-auto">
                  <Link
                    href="/catalog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl md:text-4xl font-serif italic tracking-tighter hover:text-black/50 transition-colors"
                  >
                    {t("all_collections")}
                  </Link>

                  <div className="space-y-3 sm:space-y-4">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-black/30 font-bold block">{t("men")}</span>
                    <div className="flex flex-col gap-3 sm:gap-4 ps-3 sm:ps-4">
                      <Link
                        href="/catalog/men/complet"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg sm:text-xl font-light hover:text-amber-600 transition-colors"
                      >
                        {tList("complet")} Collection
                      </Link>
                      <Link
                        href="/catalog/men/deconte"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg sm:text-xl font-light hover:text-amber-600 transition-colors"
                      >
                        {tList("deconte")} Parfum
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-black/30 font-bold block">{t("women")}</span>
                    <div className="flex flex-col gap-3 sm:gap-4 ps-3 sm:ps-4">
                      <Link
                        href="/catalog/women/complet"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg sm:text-xl font-light hover:text-amber-600 transition-colors"
                      >
                        {tList("complet")} Collection
                      </Link>
                      <Link
                        href="/catalog/women/deconte"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg sm:text-xl font-light hover:text-amber-600 transition-colors"
                      >
                        {tList("deconte")} Parfum
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl md:text-4xl font-serif italic tracking-tighter hover:text-black/50 transition-colors pt-4"
                  >
                    {t("contact")}
                  </Link>
                </div>

                <div className="mt-auto p-4 sm:p-6 border-t border-zinc-100 space-y-3 sm:space-y-4 flex-shrink-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-black/30 font-bold block">Maison Arabi Shop</span>
                  <div className="flex gap-6 sm:gap-8">
                    <button type="button" className="text-xs sm:text-sm font-light hover:opacity-50 transition-opacity">Instagram</button>
                    <button type="button" className="text-xs sm:text-sm font-light hover:opacity-50 transition-opacity">Twitter</button>
                  </div>
                  <Link
                    href="/Admin/Login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-zinc-400 hover:text-black transition-colors pt-2 sm:pt-4"
                  >
                    Admin Access
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
