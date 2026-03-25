"use client";

import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, SearchIcon, Loader2 } from "lucide-react";

// Types
import { ProductsProps } from "@/services/productServices";

// Hooks & Services
import { RecentQuery, GetRecentQuery } from "@/hooks/useRecentQuery";
import { GetProduct } from "@/services/productServices";
import { clear, remove } from "@/services/queryServices";

// Components
import RecentSearchChip from "@/components/RecentSearchChip";
import SuggestionItem from "@/components/SuggestionItem";

// ===================================
// Main Component
// ===================================

function SearchPage() {
    const router = useRouter();
    const { saveRecentQuery } = RecentQuery();
    const { getRecentQuery } = GetRecentQuery();

    // State
    const [query, setQuery] = useState<string>("");
    const [recentQueries, setRecentQueries] = useState<string[]>([]);
    const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // ===================================
    // Initial Data Fetching
    // ===================================

    useEffect(() => {
        const initializeData = async () => {
            setIsLoading(true);
            try {
                const [productData, historyData] = await Promise.all([
                    GetProduct(),
                    getRecentQuery()
                ]);

                if (productData?.carts) {
                    const items = productData.carts.flatMap((cart) => cart.products);
                    setAllProducts(items);
                }

                if (historyData) {
                    setRecentQueries(historyData);
                }
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        initializeData();
    }, [getRecentQuery]);

    const filteredProducts = useMemo(() => {
        if (!query.trim()) return [];
        const searchTerms = query.toLowerCase().trim();
        return allProducts.filter((p) =>
            p.title.toLowerCase().includes(searchTerms)
        );
    }, [allProducts, query]);



    // ===================================
    // Handlers
    // ===================================


    const handleSearchSubmit = useCallback((title: string) => {
        if (!title.trim()) return;
        const encoded = encodeURIComponent(title.trim());
        router.push(`/product?search_query=${encoded}`);
        saveRecentQuery(title.trim());
    }, [router, saveRecentQuery]);

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearchSubmit(query);
    };

    const handleRemoveRecent = async (title: string) => {
        try {
            await remove(title);
            setRecentQueries((prev) => prev.filter((q) => q !== title));
        } catch (error) {
            console.error("Removal error:", error);
        }
    };

    const clearAllLocal = async () => {
        try {
            await clear();
            setRecentQueries([]);
        } catch (error) {
            console.error("Clear error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header / Search Bar */}
            <header className="sticky top-0 z-10 bg-main shadow-md">
                <div className="container mx-auto flex items-center gap-4 px-4 py-3">
                    <Link href="/dashboard" className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="text-accent" size={32} />
                    </Link>

                    <form
                        onSubmit={onFormSubmit}
                        className="flex-1 flex items-center bg-white rounded-xl overflow-hidden shadow-inner ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-accent transition-all"
                    >
                        <input
                            placeholder="Explore products..."
                            value={query}
                            autoFocus
                            className="flex-1 bg-transparent px-4 py-3 text-gray-700 outline-none placeholder:text-gray-400"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-accent h-12 w-14 flex items-center justify-center hover:brightness-110 active:scale-95 transition-all text-white"
                        >
                            <SearchIcon size={24} />
                        </button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto p-4 max-w-2xl">
                {/* Recent Searches Section */}
                {recentQueries.length > 0 && !query && (
                    <section className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent History</h2>
                            <button
                                onClick={clearAllLocal}
                                className="text-xs text-accent font-semibold hover:underline decoration-2"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recentQueries.map((item, idx) => (
                                <RecentSearchChip
                                    key={`recent-${idx}`}
                                    item={item}
                                    onSearch={handleSearchSubmit}
                                    onRemove={handleRemoveRecent}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Suggestions Section */}
                {query.trim() && (
                    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                        {isLoading ? (
                            <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
                                <Loader2 className="animate-spin" size={32} />
                                <p className="text-sm">Loading suggestions...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <SuggestionItem
                                    key={`${product.id}-${index}`}
                                    item={product}
                                    onClick={handleSearchSubmit}
                                />
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                <p className="font-medium">No results found for "{query}"</p>
                                <p className="text-sm mt-1">Try searching for something else</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}

export default memo(SearchPage);