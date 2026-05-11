"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/routing';

const locales = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'ar', label: 'AR', full: 'العربية', dir: 'rtl' }
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const t = useTranslations('LocaleSwitcher');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const activeLocale = locales.find(l => l.code === locale) || locales[0];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/40 backdrop-blur-md border border-zinc-800/50 hover:border-amber-500/50 transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('label')}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 group-hover:text-amber-400 transition-colors">
          {activeLocale.label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="text-zinc-500 group-hover:text-amber-400 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-3 w-40 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 overflow-hidden shadow-2xl"
          >
            <div className="py-2">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={`w-full text-left px-5 py-3 text-xs tracking-widest transition-all ${
                    locale === l.code 
                      ? 'text-amber-400 bg-zinc-900/50' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                  dir={l.dir || 'ltr'}
                >
                  {l.full}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
