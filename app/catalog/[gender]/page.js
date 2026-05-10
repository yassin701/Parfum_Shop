"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import UserNavbar from "@/app/components/UserNavbar";

export default function GenderSelectionPage({ params }) {
    const { gender } = use(params);
    const isMen = gender === "men";
    const [previews, setPreviews] = useState({});

    useEffect(() => {
        const fetchPreviews = async () => {
            try {
                const [completRes, deconteRes] = await Promise.all([
                    axios.get(`/api/products/GetProducts?gender=${gender}&type=complet&limit=1`),
                    axios.get(`/api/products/GetProducts?gender=${gender}&type=deconte&limit=1`)
                ]);
                
                setPreviews({
                    complet: completRes.data[0]?.image_url,
                    deconte: deconteRes.data[0]?.image_url
                });
            } catch (err) {
                console.error("Error fetching category previews:", err);
            }
        };
        fetchPreviews();
    }, [gender]);

    const types = [
        {
            id: "complet",
            title: "Parfum Complet",
            subtitle: "Full Collection",
            description: "The complete artisanal experience in its original majestic vessel.",
            image: previews.complet,
            href: `/catalog/${gender}/complet`,
        },
        {
            id: "deconte",
            title: "Déconté Parfum",
            subtitle: "Extrait de Parfum",
            description: "Pure essence, meticulously decanted for the most discerning collectors.",
            image: previews.deconte,
            href: `/catalog/${gender}/deconte`,
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
            <UserNavbar />
            
            <main className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-12">
                <div className="mb-12 text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-zinc-400 font-bold mb-4 block"
                    >
                        {isMen ? "Pour Homme" : "Pour Femme"}
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif italic text-zinc-900"
                    >
                        Select Your <span className="text-zinc-300 font-light">Experience</span>
                    </motion.h1>
                </div>

                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:h-[60vh]">
                    {types.map((type, idx) => (
                        <Link key={type.id} href={type.href} className="group relative block h-[50vh] md:h-full overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700">
                            <motion.img
                                src={type.image}
                                alt={type.title}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                            
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.2 }}
                                >
                                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-amber-400/80 mb-4 block">
                                        {type.subtitle}
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                                        {type.title}
                                    </h2>
                                    <p className="max-w-xs text-xs md:text-sm text-zinc-400 font-medium leading-relaxed mb-8 transform transition-all duration-500 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        {type.description}
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <span className="inline-block px-10 md:px-12 py-3 md:py-4 bg-white text-zinc-950 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black rounded-full transition-all duration-500 group-hover:bg-amber-400 group-hover:text-zinc-950">
                                            Select
                                        </span>
                                        <div className="hidden md:block h-[1px] w-0 bg-amber-400 transition-all duration-500 group-hover:w-20" />
                                    </div>
                                </motion.div>
                            </div>
                            
                            <div className="absolute inset-0 border-[0px] border-amber-400/30 transition-all duration-700 group-hover:border-[1px] pointer-events-none" />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
