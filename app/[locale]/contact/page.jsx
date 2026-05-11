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

      <div className="flex flex-col lg:flex-row h-screen pt-20">
        {/* LEFT: CINEMATIC IMAGE */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 h-64 lg:h-full bg-zinc-100"
        >
          <Image
            src="/luxury_perfume_atelier.png"
            alt="Maison Arabi Atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-serif tracking-widest uppercase mb-2">{t("left_title")}</h2>
            <p className="text-sm tracking-[0.4em] opacity-70">{t("left_subtitle")}</p>
          </div>
        </motion.div>

        {/* RIGHT: THE FORM */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg"
              >
                <div className="mb-12">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4 block">{t("form_subtitle")}</span>
                  <h1 className="text-5xl font-serif mb-6 tracking-tight">{t("form_title")}</h1>
                  <p className="text-gray-500 leading-relaxed font-light">
                    {t("form_desc")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors peer"
                        placeholder=" "
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4">
                        {t("name")}
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors peer"
                        placeholder=" "
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4">
                        {t("email")}
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option>{t("subject1")}</option>
                      <option>{t("subject2")}</option>
                      <option>{t("subject3")}</option>
                      <option>{t("subject4")}</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-gray-400">
                      {t("subject")}
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea
                      required
                      rows="4"
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors peer resize-none"
                      placeholder=" "
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-4">
                      {t("message")}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-4 bg-black text-white px-10 py-5 overflow-hidden transition-all duration-500 hover:gap-6"
                  >
                    <span className="relative z-10 text-xs uppercase tracking-[0.3em]">{t("send")}</span>
                    <div className="relative z-10 w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-sm"
              >
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-8 h-8 bg-black rounded-full"
                  />
                </div>
                <h2 className="text-3xl font-serif mb-4">{t("success_title")}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {t("success_msg")}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
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
