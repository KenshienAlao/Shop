"use client";
import { GetProduct } from "@/services/productServices";
import {
  ArrowLeft,
  Loader2,
  MessageCircle,
  Share2,
  ShoppingCart,
  Truck,
  ZoomIn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductsProps } from "@/services/productServices";
import AddToCart from "@/components/AddToCart";

export default function ShowProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productURL = searchParams.get("id");
  const [product, setProduct] = useState<ProductsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isOpenAddToCart, setIsOpenAddToCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await GetProduct();
        const products = data.carts.flatMap((item: any) => item.products);
        setProduct(products);
      } catch (error) {
        throw new Error("Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const searchedProduct = product.find(
    (item) => item.id === Number(productURL),
  );

  useEffect(() => {
    if (searchedProduct?.thumbnail) {
      setSelectedImage(searchedProduct.thumbnail);
    }
  }, [searchedProduct]);

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-accent h-10 w-10 animate-spin" />
          <p className="text-sm text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!searchedProduct) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-gray-50">
        <p className="text-lg font-semibold text-gray-500">Product not found</p>
        <button
          onClick={() => router.back()}
          className="bg-accent rounded-lg px-5 py-2 text-sm font-medium text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={selectedImage ?? searchedProduct.thumbnail}
            alt={searchedProduct.title}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}

      {isOpenAddToCart && searchedProduct && (
        <AddToCart
          product={searchedProduct}
          onClose={() => setIsOpenAddToCart((prev) => !prev)}
        />
      )}

      <div className="flex min-h-dvh flex-col bg-gray-100 pb-24">
        <div className="bg-accent sticky top-0 z-50 flex">
          <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
            <button
              onClick={() => router.back()}
              className="rounded-full p-1 transition-opacity hover:opacity-80 active:opacity-60"
            >
              <ArrowLeft className="text-main" height={26} width={26} />
            </button>
            <span className="text-main line-clamp-1 max-w-[60%] text-sm font-medium">
              {searchedProduct.title}
            </span>
            <button className="rounded-full p-1 transition-opacity hover:opacity-80 active:opacity-60">
              <Share2 className="text-main" height={22} width={22} />
            </button>
          </header>
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full max-w-2xl flex-1 px-0 md:px-4 md:py-4">
          {/* Image Gallery */}
          <div className="bg-white">
            {/* Main Image */}
            <div
              className="relative aspect-square w-full cursor-zoom-in overflow-hidden bg-gray-50"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={selectedImage ?? searchedProduct.thumbnail}
                alt={searchedProduct.title}
                className="h-full w-full object-cover transition-transform duration-500"
              />
              {searchedProduct.discountPercentage > 0 && (
                <div className="bg-accent absolute top-3 left-0 rounded-r-md px-2 py-1 text-xs font-bold text-white">
                  -{Math.round(searchedProduct.discountPercentage)}% OFF
                </div>
              )}
              <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
                <ZoomIn size={12} />
                Tap to zoom
              </div>
            </div>
          </div>

          {/* Product Info Card */}
          <div className="mt-2 bg-white px-4 py-4">
            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="text-accent text-2xl font-bold">
                ${searchedProduct.price.toFixed(2)}
              </span>
              <span className="bg-accent self-center rounded-full px-2 py-0.5 text-[11px] font-bold text-white">
                -{Math.round(searchedProduct.discountPercentage)}% OFF
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-1.5 text-base leading-snug font-semibold text-gray-800">
              {searchedProduct.title}
            </h1>
            <div className="mt-3 flex items-center">
              <span className="rounded-md border border-orange-100 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
                Stock: {searchedProduct.quantity}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2.5 bg-white px-4 py-3">
            <Truck className="text-accent shrink-0" size={18} />
            <div>
              <p className="text-xs font-medium text-gray-700">Free Shipping</p>
              <p className="text-[11px] text-gray-400">
                Estimated delivery: 3–7 business days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2">
          {/* Chat Button */}
          <button
            id="chat-seller-btn"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl border border-gray-200 px-3 py-2 text-gray-500 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 active:scale-95"
          >
            <MessageCircle size={20} />
            <span className="text-[10px] leading-none font-medium whitespace-nowrap">
              Chat
            </span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={() => setIsOpenAddToCart(true)}
            id="add-to-cart-btn"
            className="border-accent text-accent flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors hover:bg-orange-50 active:scale-95"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          {/* Buy Now Button */}
          <button
            id="buy-now-btn"
            className="bg-accent flex flex-1 items-center justify-center rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
