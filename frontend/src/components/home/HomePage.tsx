"use client";

import Link from "next/link";
import { Loader2, MessageCircleMore, Search } from "lucide-react";
import { getProducts, Product, Cart } from "@/services/productService";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSeeProduct } from "@/hooks/useSeeProduct";

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerSentinelRef = useRef<HTMLDivElement | null>(null);
    const { product: navigateToProduct } = useSeeProduct();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setIsLoadingProducts(true);
                const data = await getProducts();
                const flattenedProducts = data.carts.flatMap((cart: Cart) => cart.products);
                setProducts(flattenedProducts);
            } catch (error) {
                console.error("[HomePage] Product fetch error:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchAllProducts();
    }, []);

    const hasMoreItems = visibleCount < products.length;

    const loadMoreData = useCallback(() => {
        if (isLoading || !hasMoreItems) return;

        setIsLoading(true);
        // Simulate loading for better UX
        setTimeout(() => {
            setVisibleCount((prev) =>
                Math.min(prev + ITEMS_PER_PAGE, products.length),
            );
            setIsLoading(false);
        }, 800);
    }, [isLoading, hasMoreItems, products.length]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreData();
                }
            },
            { threshold: 0.1 },
        );

        if (observerSentinelRef.current) {
            observerRef.current.observe(observerSentinelRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [loadMoreData]);

    const displayProducts = products.slice(0, visibleCount);

    return (
        <div className="flex w-full flex-col bg-gray-50 min-h-screen">
            {/* Sticky Search Header */}
            <div className="bg-accent sticky top-0 z-50 shadow-md">
                <header className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
                    <Link
                        href="/search"
                        className="bg-white/90 backdrop-blur flex max-w-xl flex-1 items-center gap-2 rounded-lg p-3 hover:bg-white transition-colors"
                    >
                        <Search className="text-gray-400" size={20} />
                        <span className="text-accent font-medium">Search for products...</span>
                    </Link>
                    <button className="text-white hover:opacity-80 transition-opacity">
                        <MessageCircleMore size={32} />
                    </button>
                </header>
            </div>

            {/* Product Grid */}
            <main className="flex justify-center flex-1">
                <div className="grid w-full max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-3 md:gap-6 md:px-8 lg:grid-cols-4 xl:grid-cols-5">
                    {isLoadingProducts ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                                <div className="aspect-square w-full bg-gray-200" />
                                <div className="flex flex-col p-3 space-y-3">
                                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                                </div>
                            </div>
                        ))
                    ) : (
                        displayProducts.map((item: Product, index: number) => (
                            <div
                                key={`${item.id}-${index}`}
                                onClick={() => navigateToProduct(item)}
                                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {item.discountPercentage > 0 && (
                                        <div className="bg-red-500 absolute top-2 right-0 px-2 py-1 text-[10px] font-black text-white uppercase shadow-sm">
                                            -{Math.round(item.discountPercentage)}% OFF
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col p-3 md:p-4">
                                    <h3 className="line-clamp-2 min-h-10 text-xs font-semibold text-gray-800 md:text-sm">
                                        {item.title}
                                    </h3>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-accent text-sm font-black md:text-lg">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </main>

            {/* Pagination Sentinel */}
            <div ref={observerSentinelRef} className="flex justify-center py-10">
                {isLoading && (
                    <div className="flex items-center gap-3 text-gray-400">
                        <Loader2 className="h-6 w-6 animate-spin text-accent" />
                        <span className="text-sm font-medium">Loading more products...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

