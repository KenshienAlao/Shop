import { Loader2, Minus, Plus, X } from "lucide-react";

import { Product } from "@/services/productService";
import { useState } from "react";
import { useAddToCart } from "@/hooks/useCart";

interface AddToCartProps {
  product: Product;
  onClose: () => void;
}

export default function AddToCart({ product, onClose }: AddToCartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCartConfirm = async () => {
    setIsLoading(true);
    await addToCart(product.id, quantity);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-100 flex items-end justify-center bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="animate-slide-up relative w-full max-w-2xl transform rounded-t-[2.5rem] border-t border-gray-100 bg-white px-5 pt-8 pb-10 shadow-2xl">
        {/* Handle for drawer aesthetic */}
        <div className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-200" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-8">
          {/* Product Header */}
          <div className="flex gap-5">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-50 shadow-inner ring-1 ring-gray-100">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-end pt-2">
              <h3 className="line-clamp-1 text-xl font-bold text-gray-800">
                {product.title}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-accent text-2xl font-black">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  Stock: {product.quantity}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-y border-gray-50 py-6">
              <span className="text-sm font-bold tracking-tight text-gray-800 uppercase">
                Quantity
              </span>
              <div className="flex items-center gap-1 rounded-2xl bg-gray-100 p-1.5 shadow-inner">
                <button
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 active:scale-90 disabled:opacity-40"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span className="flex min-w-10 justify-center text-lg font-black text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= product.quantity}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 active:scale-90 disabled:opacity-40"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Subtotal & Action */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-medium text-gray-400">Subtotal</span>
              <span className="text-lg font-bold text-gray-800">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleAddToCartConfirm}
              id="confirm-add-to-cart"
              className="bg-accent flex w-full items-center justify-center gap-3 rounded-[1.25rem] py-5 text-base font-black text-white shadow-[0_10px_20px_rgba(245,74,0,0.3)] transition-all hover:opacity-95 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              ) : (
                <span>Add to Cart</span>
              )}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

