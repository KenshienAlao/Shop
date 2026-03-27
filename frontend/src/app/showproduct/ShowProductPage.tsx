"use client";

import { getProducts, Product, Cart } from "@/services/productService";
import {
  ArrowLeft,
  Loader2,
  MessageCircle,
  Share2,
  ShoppingCart,
  Truck,
  ZoomIn,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import AddToCart from "@/components/AddToCart";

export default function ShowProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        const flattenedProducts = data.carts.flatMap((cart: Cart) => cart.products);
        setProducts(flattenedProducts);
      } catch (error) {
        console.error("[ShowProductPage] Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, []);

  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === Number(productId));
  }, [products, productId]);

  useEffect(() => {
    if (currentProduct?.thumbnail) {
      setSelectedImage(currentProduct.thumbnail);
    }
  }, [currentProduct]);
  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-accent h-10 w-10 animate-spin" />
          <p className="text-sm font-medium text-gray-400">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-gray-50 px-6 text-center">
        <p className="text-lg font-bold text-gray-800">Product not found</p>
        <p className="text-sm text-gray-500 max-w-xs">We couldn't find the product you're looking for. It might have been removed or the link is incorrect.</p>
        <button
          onClick={() => router.back()}
          className="bg-accent rounded-xl px-8 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 active:scale-95 transition-transform"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Photo Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <img
            src={selectedImage ?? currentProduct.thumbnail}
            alt={currentProduct.title}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl animate-in zoom-in-95 duration-200"
          />
        </div>
      )}

      {/* Add To Cart Drawer */}
      {isAddToCartOpen && (
        <AddToCart
          product={currentProduct}
          onClose={() => setIsAddToCartOpen(false)}
        />
      )}

      <div className="flex min-h-dvh flex-col bg-gray-50 pb-28">
        {/* Header */}
        <div className="bg-accent sticky top-0 z-50 shadow-md">
          <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
            <button
              onClick={() => router.back()}
              className="rounded-full p-2 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="text-white" size={24} />
            </button>
            <h2 className="text-white line-clamp-1 max-w-[60%] text-sm font-bold tracking-tight">
              {currentProduct.title}
            </h2>
            <button className="rounded-full p-2 hover:bg-white/10 transition-colors">
              <Share2 className="text-white" size={22} />
            </button>
          </header>
        </div>

        {/* Global Body Container */}
        <main className="mx-auto w-full max-w-4xl flex-1 md:py-6">
          <div className="flex flex-col md:flex-row gap-6">

            {/* Left: Image Section */}
            <div className="w-full md:w-1/2">
              <div
                className="relative aspect-square w-full cursor-zoom-in overflow-hidden bg-white shadow-sm md:rounded-2xl"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={selectedImage ?? currentProduct.thumbnail}
                  alt={currentProduct.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                {currentProduct.discountPercentage > 0 && (
                  <div className="bg-red-500 absolute top-4 left-0 rounded-r-lg px-3 py-1.5 text-xs font-black text-white shadow-lg">
                    -{Math.round(currentProduct.discountPercentage)}% OFF
                  </div>
                )}
                <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                  <ZoomIn size={14} />
                  TAP TO ZOOM
                </div>
              </div>
            </div>

            {/* Right: Product Detail Section */}
            <div className="flex-1 space-y-4 px-4 md:px-0">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-accent text-3xl font-black">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 rounded-full px-2.5 py-1 text-[11px] font-bold">
                    SALE
                  </span>
                </div>

                <h1 className="mt-4 text-xl font-bold leading-tight text-gray-900">
                  {currentProduct.title}
                </h1>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5 border border-orange-100">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">
                      IN STOCK: {currentProduct.quantity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="bg-accent/10 p-3 rounded-xl">
                  <Truck className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Premium Shipping</p>
                  <p className="text-xs text-gray-500">
                    Guaranteed delivery within 3–5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Persistent Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-4 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3">
          <button
            id="chat-seller-btn"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-200 w-16 h-14 text-gray-500 transition-all hover:bg-gray-50 active:scale-90"
          >
            <MessageCircle size={22} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Chat</span>
          </button>

          <button
            onClick={() => setIsAddToCartOpen(true)}
            id="add-to-cart-btn"
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-accent text-accent h-14 text-sm font-bold transition-all hover:bg-accent/5 active:scale-95"
          >
            <ShoppingCart size={20} />
            ADD TO CART
          </button>

          <button
            id="buy-now-btn"
            className="flex-1 bg-accent rounded-2xl h-14 text-sm font-black text-white shadow-xl shadow-accent/20 transition-all hover:opacity-90 active:scale-95"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </>
  );
}

