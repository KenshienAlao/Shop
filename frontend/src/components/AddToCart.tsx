import { Minus, Plus, X } from "lucide-react";
import { ProductsProps } from "@/services/productServices";
import { useState } from "react";

interface AddToCartProps {
    product: ProductsProps;
    onClose: () => void;
}

export default function AddToCart({ product, onClose }: AddToCartProps) {
    const [quantity, setQuantity] = useState(1);

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQty = () => {
        if (quantity < product.quantity) setQuantity(quantity + 1);
    };

    return (
        <div
            className="fixed inset-0 z-100 flex items-end justify-center bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur-[2px] animate-fade-in"
        >
            <div className="absolute inset-0" onClick={onClose} />
            <div
                className="relative w-full max-w-2xl transform rounded-t-[2.5rem] bg-white px-5 pt-8 pb-10 shadow-2xl border-t border-gray-100 animate-slide-up"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:scale-90 transition-all"
                >
                    <X size={20} />
                </button>
                <div className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-200" />
                <div className="flex flex-col gap-8">
                    <div className="flex gap-5">
                        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-gray-100 shadow-inner">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-end pt-2">
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent drop-shadow-sm">
                                Premium Item
                            </div>
                            <h3 className="line-clamp-1 text-xl font-bold text-gray-800">
                                {product.title}
                            </h3>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-accent">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xs font-medium text-gray-400">
                                    Stock: {product.quantity}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-y border-gray-50 py-6">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">Quantity</span>
                                <span className="text-[11px] text-gray-400">Set desired amount</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-2xl bg-gray-100 p-1.5 shadow-inner">
                                <button
                                    onClick={decreaseQty}
                                    disabled={quantity <= 1}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 active:scale-90 disabled:opacity-40 disabled:active:scale-100"
                                >
                                    <Minus size={16} strokeWidth={3} />
                                </button>
                                <span className="flex min-w-[50px] justify-center text-lg font-black text-gray-800">
                                    {quantity}
                                </span>
                                <button
                                    onClick={increaseQty}
                                    disabled={quantity >= product.quantity}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 active:scale-90 disabled:opacity-40 disabled:active:scale-100"
                                >
                                    <Plus size={16} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-sm font-medium text-gray-400">Subtotal</span>
                            <span className="text-lg font-bold text-gray-800">
                                ${(product.price * quantity).toFixed(2)}
                            </span>
                        </div>
                        <button
                            id="confirm-add-to-cart"
                            className="bg-accent flex w-full items-center justify-center gap-3 rounded-[1.25rem] py-5 text-base font-black text-white shadow-[0_10px_20px_rgba(245,74,0,0.3)] transition-all hover:opacity-95 active:scale-[0.98]"
                        >
                            <span>Add to Cart</span>
                            <div className="h-5 w-px bg-white/30" />
                            <span>${(product.price * quantity).toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}