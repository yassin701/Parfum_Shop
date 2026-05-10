"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/app/components/Cards";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/api/products/GetProducts");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handleDelete = async () => {
        if (!deletingProduct) return;
        setLoading(true);
        try {
            await axios.delete(`/api/products/${deletingProduct.id}`);
            setProducts(products.filter((p) => p.id !== deletingProduct.id));
            setDeletingProduct(null);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete product.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(`/api/products/${editingProduct.id}`, editingProduct);
            setProducts(
                products.map((p) => (p.id === editingProduct.id ? res.data.data[0] : p))
            );
            setEditingProduct(null);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Inventory <span className="text-gray-400 font-light">Management</span>
                </h1>
                <p className="text-sm text-gray-500">{products.length} Products Total</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Cards
                        key={product.id}
                        product={product}
                        isAdmin={true}
                        onEdit={(p) => setEditingProduct(p)}
                        onDelete={(p) => setDeletingProduct(p)}
                    />
                ))}
            </div>

            {/* DELETE MODAL */}
            {deletingProduct && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.34 7m-4.74 0l-.34-7m4.74-3.374c.49.126.97.272 1.447.438m.512-1.947A2.49 2.49 0 0013.013 3h-2.025a2.49 2.49 0 00-2.447 1.379L7.4 5.374M4.5 5.374c.49-.126.97-.272 1.447-.438m0 0L2.125 10.611m12.75 0V21a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V10.611m12.75 0a.75.75 0 111.5 0v.75m-.75-3.123V3.374m0 0a3 3 0 013 3v.374m-3-.374h-3" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Product?</h2>
                        <p className="text-gray-500 text-center text-sm mb-6">
                            Are you sure you want to delete <span className="font-semibold text-gray-900">"{deletingProduct.name}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingProduct(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-200 disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
                        <div className="bg-zinc-950 p-6 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">Edit Product</h2>
                            <button onClick={() => setEditingProduct(null)} className="text-zinc-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-8 space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editingProduct.name || ""}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-zinc-950 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price (MAD)</label>
                                    <input
                                        type="number"
                                        required
                                        value={editingProduct.price || ""}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-zinc-950 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</label>
                                    <select
                                        value={editingProduct.gender || ""}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, gender: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-zinc-950 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Type</label>
                                <select
                                    value={editingProduct.product_type || ""}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, product_type: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-zinc-950 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="complet">Parfum Complet</option>
                                    <option value="deconte">Déconté Parfum</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    value={editingProduct.image_url || ""}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-zinc-950 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-medium transition-all shadow-xl shadow-zinc-200 disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}