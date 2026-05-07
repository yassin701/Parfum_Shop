"use client";

import { useState } from "react";
import axios from "axios";
export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        gender: "men",
        image: null,
    });

    // Cloudinary
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
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFile = (e) => {
        setForm({
            ...form,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageUrl = await uploadToCloudinary(form.image);

            //send to backend 
            const res = await axios.post("/api/products", {
                name: form.name,
                price: Number(form.price),
                gender: form.gender,
                image_url: imageUrl,
            });

            console.log(res.data);
            setForm({ name: "", price: "", gender: "men", image: null });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">
                    Add Product
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Perfume name"
                    className="w-full border p-3 rounded-lg"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full border p-3 rounded-lg"
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    className="w-full border p-3 rounded-lg"
                    onChange={handleChange}
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </select>

                <input
                    type="file"
                    className="w-full border p-3 rounded-lg"
                    onChange={handleFile}
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white p-3 rounded-lg"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}