"use client";

import { Link } from "@/routing";
import { motion } from "framer-motion";
import UserNavbar from "@/app/[locale]/components/UserNavbar";
import { useTranslations } from "next-intl";

export default function CatalogPage() {
  const t = useTranslations("Catalog");

  const categories = [
    {
      title: t("men_title"),
      subtitle: t("men_subtitle"),
      description: t("men_desc"),
      image: "/categories/men.png",
      href: "/catalog/men",
    },
    {
      title: t("women_title"),
      subtitle: t("women_subtitle"),
      description: t("women_desc"),
      image: "/categories/women.png",
      href: "/catalog/women",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      <UserNavbar />
      
      <main className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-12">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[75vh]">
          {categories.map((cat, idx) => (
            <Link key={cat.title} href={cat.href} className="group relative block h-[60vh] md:h-full overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-700">
              <motion.img
                src={cat.image}
                alt={cat.title}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.2 }}
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-70 mb-3 block">
                    {cat.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif italic mb-4 leading-tight">
                    {cat.title}
                  </h2>
                  <p className="max-w-sm text-xs md:text-sm text-gray-300 font-light leading-relaxed mb-8 transform transition-all duration-500 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="inline-block px-8 md:px-10 py-3 md:py-4 border border-white/30 backdrop-blur-md rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-semibold transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white">
                      {t("explore")}
                    </span>
                    <div className="hidden md:block h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-16" />
                  </div>
                </motion.div>
              </div>
              <div className="absolute inset-0 border-[0px] border-white/20 transition-all duration-500 group-hover:border-[16px] pointer-events-none" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
