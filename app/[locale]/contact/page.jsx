"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserNavbar from "../components/UserNavbar";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: t("subject1"),
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Add real submission logic here later
  };

  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      <UserNavbar />

      {/* FIXED: Mobile layout without h-screen overflow issues */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] lg:h-screen pt-20">
        {/* LEFT: CINEMATIC IMAGE - Better mobile height */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 h-[50vh] lg:h-full bg-zinc-100"
        >
          <Image
            src="/luxury_perfume_atelier.png"
            alt="Maison Arabi Atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          
          {/* FIXED: Better positioning for mobile text */}
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 text-white">
            <h2 className="text-2xl sm:text-4xl font-serif tracking-widest uppercase mb-1 sm:mb-2">
              {t("left_title")}
            </h2>
            <p className="text-[8px] sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] opacity-70">
              {t("left_subtitle")}
            </p>
          </div>
        </motion.div>

        {/* RIGHT: THE FORM - Fixed scrolling & padding */}
        <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-4 sm:p-6 md:p-8 lg:p-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg my-8 lg:my-0"
              >
                {/* FIXED: Better spacing on mobile */}
                <div className="mb-8 sm:mb-12">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-gray-400 mb-3 sm:mb-4 block">
                    {t("form_subtitle")}
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-serif mb-3 sm:mb-6 tracking-tight">
                    {t("form_title")}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light">
                    {t("form_desc")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* FIXED: Grid becomes column on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors peer"
                        placeholder=" "
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4">
                        {t("name")}
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors peer"
                        placeholder=" "
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4">
                        {t("email")}
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option>{t("subject1")}</option>
                      <option>{t("subject2")}</option>
                      <option>{t("subject3")}</option>
                      <option>{t("subject4")}</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[8px] sm:text-[10px] uppercase tracking-widest text-gray-400">
                      {t("subject")}
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors peer resize-none"
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                    <label className="absolute left-0 top-3 text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4">
                      {t("message")}
                    </label>
                  </div>

                  {/* FIXED: Button full width on mobile */}
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center sm:justify-start gap-4 bg-black text-white px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto overflow-hidden transition-all duration-500 hover:gap-6"
                  >
                    <span className="relative z-10 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                      {t("send")}
                    </span>
                    <div className="relative z-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-sm px-4 my-8 lg:my-0"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif mb-3 sm:mb-4">
                  {t("success_title")}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 sm:mb-8">
                  {t("success_msg")}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[9px] sm:text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
                >
                  {t("back")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}