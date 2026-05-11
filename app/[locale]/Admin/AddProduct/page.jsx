"use client";

import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        gender: "men",
        product_type: "complet",
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD;

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
        );
        return res.data.secure_url;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const imageUrl = await uploadToCloudinary(form.image);
            const category_slug = `${form.gender}-${form.product_type}`;
            
            await axios.post("/api/products", {
                name: form.name,
                price: Number(form.price),
                gender: form.gender,
                product_type: form.product_type,
                category_slug: category_slug,
                image_url: imageUrl,
            });
            setForm({ 
                name: "", 
                price: "", 
                gender: "men", 
                product_type: "complet",
                image: null 
            });
            setPreview(null);
            alert("Product added successfully!");
        } catch (err) {
            console.error(err);
            alert("Error adding product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
                    New <span className="text-zinc-400 font-light italic">Fragrance</span>
                </h1>
                <p className="text-zinc-500 text-sm">Expand your luxury collection with a new masterwork.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* LEFT: FORM FIELDS */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Perfume Signature</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="e.g. Royal Oud"
                                className="w-full bg-zinc-50 border-none p-4 rounded-2xl text-zinc-900 placeholder-zinc-300 focus:ring-2 focus:ring-zinc-950 transition-all outline-none"
                                onChange={handleChange}
                                value={form.name}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Valuation (MAD)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="0.00"
                                    className="w-full bg-zinc-50 border-none p-4 rounded-2xl text-zinc-900 placeholder-zinc-300 focus:ring-2 focus:ring-zinc-950 transition-all outline-none"
                                    onChange={handleChange}
                                    value={form.price}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Essence Group</label>
                                <select
                                    name="gender"
                                    className="w-full bg-zinc-50 border-none p-4 rounded-2xl text-zinc-900 focus:ring-2 focus:ring-zinc-950 transition-all outline-none appearance-none"
                                    onChange={handleChange}
                                    value={form.gender}
                                >
                                    <option value="men">For Men</option>
                                    <option value="women">For Women</option>
                                    <option value="unisex">Unisex Collective</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Catalog Class</label>
                            <select
                                name="product_type"
                                className="w-full bg-zinc-50 border-none p-4 rounded-2xl text-zinc-900 focus:ring-2 focus:ring-zinc-950 transition-all outline-none appearance-none"
                                onChange={handleChange}
                                value={form.product_type}
                            >
                                <option value="complet">Parfum Complet</option>
                                <option value="deconte">Déconté Parfum</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Vessel Imaging</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={handleFile}
                                    required
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center w-full aspect-[2/1] border-2 border-dashed border-zinc-100 rounded-3xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 transition-all group"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-10 h-10 mb-3 text-zinc-300 group-hover:text-zinc-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-sm text-zinc-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-tighter">SVG, PNG, JPG or WEBP (MAX. 800x400px)</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-zinc-950 text-white p-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-2xl shadow-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : "Archive Product"}
                    </button>
                </div>

                {/* RIGHT: PREVIEW CARD */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-10">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-4 ml-1">Live Manifestation</label>
                        <div className="max-w-[320px] mx-auto">
                            {preview ? (
                                <div className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
                                    <div className="relative h-[400px] overflow-hidden bg-zinc-50">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20">
                                            <p className="text-sm font-black text-zinc-900 tracking-tight">
                                                {form.price || "0.00"} <span className="text-[10px] text-zinc-500 uppercase ml-0.5">mad</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
                                            {form.name || "Fragrance Name"}
                                        </h2>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{form.gender}</span>
                                            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">• {form.product_type}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-[520px] rounded-3xl border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center p-8 text-center bg-zinc-50/50">
                                    <div className="w-16 h-16 bg-zinc-100 rounded-2xl mb-4 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-zinc-400 text-sm italic">Waiting for creation... <br />Your preview will manifest here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}