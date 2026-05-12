"use client";

import { useDispatch } from "react-redux";
import { Link } from "@/routing";
import { cartActions } from "../../../redux/slices/cartSlice";
import { uiActions } from "../../../redux/slices/uiSlice";
import { useTranslations } from "next-intl";

export default function ProductCard({
    product,
    isAdmin,
    onEdit,
    onDelete,
}) {
    const dispatch = useDispatch();
    const t = useTranslations("ProductCard");
    const tGen = useTranslations("Products");

    const handleAddToCart = () => {
        dispatch(
            cartActions.addToCart({
                id: product.id,
                title: product.name,
                price: product.price,
                image: product.image_url,
            })
        );
        dispatch(uiActions.show());
    };

    const catalogHref = `/catalog/${product.gender || "men"}/${product.product_type || "complet"}`;
    const titleLinkClass =
        "text-lg font-semibold leading-tight text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:text-black hover:decoration-zinc-900 transition-colors";

    return (
        <div className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1">
            {/* IMAGE CONTAINER */}
            <div className="relative h-72 overflow-hidden bg-zinc-50">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* PRICE OVERLAY */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                    <p className="text-sm font-bold text-zinc-900 tracking-tight">
                        {product.price} <span className="text-[10px] text-zinc-500 uppercase ml-0.5">{t("currency")}</span>
                    </p>
                </div>
                {/* METADATA BADGES */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-zinc-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                        {product.gender === 'men' ? tGen("men") : tGen("women")}
                    </span>
                    {product.product_type && (
                        <span className="bg-amber-400 text-zinc-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            {product.product_type === 'deconte' ? t("deconte") : t("complet")}
                        </span>
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
                <h2 className="leading-tight">
                    <Link href={catalogHref} className={titleLinkClass}>
                        {product.name}
                    </Link>
                </h2>

                {isAdmin ? (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                            onClick={() => onEdit(product)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-950 text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            {t("edit")}
                        </button>
                        <button
                            onClick={() => onDelete(product)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.34 7m-4.74 0l-.34-7m4.74-3.374c.49.126.97.272 1.447.438m.512-1.947A2.49 2.49 0 0013.013 3h-2.025a2.49 2.49 0 00-2.447 1.379L7.4 5.374M4.5 5.374c.49-.126.97-.272 1.447-.438m0 0L2.125 10.611m12.75 0V21a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V10.611m12.75 0a.75.75 0 111.5 0v.75m-.75-3.123V3.374m0 0a3 3 0 013 3v.374m-3-.374h-3" />
                            </svg>
                            {t("delete")}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-3 bg-zinc-950 text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-xl transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {t("add_to_bag")}
                    </button>
                )}
            </div>
        </div>
    );
}