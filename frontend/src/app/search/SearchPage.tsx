"use client";

import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, SearchIcon, Loader2 } from "lucide-react";

// Types
import { Product, Cart } from "@/services/productService";

// Hooks & Services
import { useSearchHistory } from "@/hooks/useRecentQuery";
import { getProducts } from "@/services/productService";
import { clearSearchQueries, removeSearchQuery } from "@/services/queryService";

// Components
import RecentSearchChip from "@/components/RecentSearchChip";
import SuggestionItem from "@/components/SuggestionItem";

// ===================================
// Search Page Component
// ===================================

function SearchPage() {
    const router = useRouter();
    const { saveSearchQuery, fetchSearchHistory } = useSearchHistory();

    // State
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // ===================================
    // Effect: Initialize Search Data
    // ===================================

    useEffect(() => {
        const initializeSearch = async () => {
            setIsLoading(true);
            try {
                const [productData, historyData] = await Promise.all([
                    getProducts(),
                    fetchSearchHistory()
                ]);

                if (productData?.carts) {
                    const allItems = productData.carts.flatMap((cart: Cart) => cart.products);
                    setProducts(allItems);
                }

                if (historyData) {
                    setSearchHistory(historyData);
                }
            } catch (error) {
                console.error("[SearchPage] Initialization error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        initializeSearch();
    }, [fetchSearchHistory]);

    // ===================================
    // Memos: Filtered Data
    // ===================================

    const filteredSuggestions = useMemo(() => {
        const normalizedQuery = searchTerm.trim().toLowerCase();
        if (!normalizedQuery) return [];
        
        return products.filter((p) =>
            p.title.toLowerCase().includes(normalizedQuery)
        );
    }, [products, searchTerm]);

    // ===================================
    // Handlers
    // ===================================

    const performSearch = useCallback((query: string) => {
        const finalizedQuery = query.trim();
        if (!finalizedQuery) return;
        
        const encodedQuery = encodeURIComponent(finalizedQuery);
        router.push(`/product?search_query=${encodedQuery}`);
        saveSearchQuery(finalizedQuery);
    }, [router, saveSearchQuery]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(searchTerm);
    };

    const handleRemoveHistoryItem = async (query: string) => {
        try {
            await removeSearchQuery(query);
            setSearchHistory((prev) => prev.filter((q) => q !== query));
        } catch (error) {
            console.error("[SearchPage] Removal error:", error);
        }
    };

    const handleClearAllHistory = async () => {
        try {
            await clearSearchQueries();
            setSearchHistory([]);
        } catch (error) {
            console.error("[SearchPage] Clear error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header / Search Input */}
            <header className="sticky top-0 z-10 bg-main shadow-md">
                <div className="container mx-auto flex items-center gap-4 px-4 py-3">
                    <Link href="/dashboard" className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="text-accent" size={32} />
                    </Link>

                    <form
                        onSubmit={handleFormSubmit}
                        className="flex-1 flex items-center bg-white rounded-xl overflow-hidden shadow-inner ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-accent transition-all"
                    >
                        <input
                            placeholder="Search products..."
                            value={searchTerm}
                            autoFocus
                            className="flex-1 bg-transparent px-4 py-3 text-gray-700 outline-none placeholder:text-gray-400"
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                {/* Search History Section */}
                {searchHistory.length > 0 && !searchTerm && (
                    <section className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Search History</h2>
                            <button
                                onClick={handleClearAllHistory}
                                className="text-xs text-accent font-semibold hover:underline decoration-2"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {searchHistory.map((item, idx) => (
                                <RecentSearchChip
                                    key={`history-${idx}`}
                                    item={item}
                                    onSearch={performSearch}
                                    onRemove={handleRemoveHistoryItem}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Search Suggestions Section */}
                {searchTerm.trim() && (
                    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                        {isLoading ? (
                            <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
                                <Loader2 className="animate-spin" size={32} />
                                <p className="text-sm">Finding products...</p>
                            </div>
                        ) : filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((product, index) => (
                                <SuggestionItem
                                    key={`${product.id}-${index}`}
                                    item={product}
                                    onClick={performSearch}
                                />
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                <p className="font-medium">No matches for "{searchTerm}"</p>
                                <p className="text-sm mt-1">Try another keyword</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}

export default memo(SearchPage);