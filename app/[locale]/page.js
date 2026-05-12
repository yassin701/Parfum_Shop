"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "@/routing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UserNavbar from "./components/UserNavbar";
import useDirection from "./hooks/useDirection";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const { multiplier } = useDirection();
  const t = useTranslations("HomePage");
  const tFooter = useTranslations("Footer");

  useEffect(() => {
    // 1. HERO SUBLINE
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.set(".hero-sub", { y: 20, opacity: 0 }).to(".hero-sub", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
    });

    // 2. REVEAL ON SCROLL
    const reveals = document.querySelectorAll(".reveal-up");
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // 3. PARALLAX PHILOSOPHY
    gsap.to(".parallax-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".philosophy-section",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [multiplier]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white overflow-hidden">
      <UserNavbar />

      <main>
        {/* SECTION 1: HERO WITH VIDEO */}
        <section ref={heroRef} className="h-screen flex flex-col items-center justify-center bg-zinc-50 relative overflow-hidden">
          {/* BACKGROUND VIDEO */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dqronp5bo/video/upload/v1778590015/mp__d4iucu.mp4" type="video/mp4" />
            </video>
            {/* CINEMATIC OVERLAY */}
            <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          <div className="text-center z-10">
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-serif tracking-[0.8em] text-white uppercase drop-shadow-2xl">
                ARABI SHOP
              </h1>
            </div>
            <div>
              <h2 className="text-7xl md:text-[14rem] font-serif italic text-white leading-none tracking-tighter drop-shadow-2xl">
                {t("hero_welcome")}
              </h2>
            </div>
            <div className="hero-sub mt-10 md:mt-14 flex flex-col items-center gap-6 max-w-lg mx-auto px-4">
              <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
                {t("hero_intro")}
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center text-[10px] uppercase tracking-[0.35em] text-white border border-white/35 px-8 py-3 rounded-full hover:bg-white hover:text-zinc-900 transition-colors duration-500"
              >
                {t("hero_cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY CHOOSE US */}
        <section className="py-40 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <header className="reveal-up text-center mb-24">
              <span className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-bold mb-4 block">{t("excellence_subtitle")}</span>
              <h2 className="text-4xl md:text-7xl font-serif italic text-zinc-900">{t("excellence_title_1")} <span className="text-zinc-300 font-light not-italic">{t("excellence_title_2")}</span></h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: t("feature1_title"), desc: t("feature1_desc"), icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
                { title: t("feature2_title"), desc: t("feature2_desc"), icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
                { title: t("feature3_title"), desc: t("feature3_desc"), icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }
              ].map((item, i) => (
                <div key={i} className="reveal-up p-12 bg-zinc-50 rounded-[3rem] border border-zinc-100 group hover:bg-zinc-900 transition-all duration-700">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-amber-400 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-950">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: THE PHILOSOPHY (Creative Section) */}
        <section className="philosophy-section relative h-[120vh] bg-zinc-950 overflow-hidden flex items-center justify-center px-6">
          {/* PARALLAX BG */}
          <div className="parallax-bg absolute inset-0 opacity-30">
            <img
              src="/categories/men.png"
              alt="Philosophy"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="absolute inset-0 bg-zinc-950/80" />

          <div className="relative z-10 max-w-4xl text-center">
            <span className="reveal-up text-[10px] uppercase tracking-[1em] text-amber-400 font-bold mb-12 block">{t("philosophy_subtitle")}</span>
            <h2 className="reveal-up text-5xl md:text-8xl font-serif italic text-white leading-tight mb-12">
              {t("philosophy_title_1")} <br />
              <span className="text-zinc-500 font-light not-italic underline decoration-[1px] underline-offset-[20px]">{t("philosophy_title_2")}</span>
            </h2>
            <p className="reveal-up text-sm md:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              {t("philosophy_desc")}
            </p>
            <div className="reveal-up mt-16">
              <Link href="/catalog" className="inline-block px-12 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.5em] font-black rounded-full hover:bg-white hover:text-zinc-950 transition-all duration-700">
                {t("philosophy_btn")}
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CATALOG TEASER */}
        <section className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="reveal-up order-2 md:order-1">
              <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-400 font-bold mb-6 block">{t("teaser_subtitle")}</span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-zinc-900 mb-8">{t("teaser_title_1")} <br /> <span className="text-zinc-300 font-light not-italic">{t("teaser_title_2")}</span></h2>
              <div className="flex gap-4">
                <Link href="/catalog/men" className="px-10 py-4 bg-zinc-950 text-white text-[9px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-amber-400 hover:text-zinc-950 transition-all">{t("teaser_btn_men")}</Link>
                <Link href="/catalog/women" className="px-10 py-4 border border-zinc-200 text-zinc-900 text-[9px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-zinc-900 hover:text-white transition-all">{t("teaser_btn_women")}</Link>
              </div>
            </div>
            <div className="reveal-up order-1 md:order-2 relative aspect-square overflow-hidden rounded-[4rem]">
              <img src="/categories/men.png" alt="Catalog Entry" className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" />
            </div>
          </div>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="bg-zinc-50 py-20 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <span className="text-2xl font-serif tracking-[0.4em] text-zinc-900">ARABI SHOP</span>
            <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mt-2 tracking-[0.5em]">{tFooter("locations")}</p>
          </div>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-400">
            <span>{tFooter("instagram")}</span>
            <span>{tFooter("whatsapp")}</span>
            <span>{tFooter("privacy")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
