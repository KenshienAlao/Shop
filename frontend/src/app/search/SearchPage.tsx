"use client";

import { get } from "@/services/queryServices";
import { useRecentQuery } from "@/hooks/useRecentQuery";
import { GetProduct } from "@/services/productServices";
import { ArrowLeft, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

function SearchPage() {
    const { saveRecentQuery } = useRecentQuery();
    const [query, setQuery] = useState<any>("");
    const [products, setProducts] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetProduct();
                const allProducts = data.carts.flatMap((item: any) => item.products);
                setProducts(allProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchRecentQuery = async () => {
            try {
                const data = await get();
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch recent queries:", error);
            }
        };
        fetchRecentQuery();
    }, []);

    const filteredProduct = products.filter((item: any) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
    );


    const handleProductClickSuggested = (title: string) => {
        router.push(`/product?q=${encodeURIComponent(title)}`);
        saveRecentQuery(title)

    };

    const handleProductSearch = (title: string) => {
        router.push(`/product?q=${encodeURIComponent(title)}`);
        saveRecentQuery(title)
    }

    const Enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleProductSearch(query);
        }
    }

    return (
        <>
            <div className="container-parent min-h-dvh bg-gray-200">
                <div className="bg-main flex items-center justify-start gap-5 px-4 py-2">
                    <Link href="/dashboard">
                        <ArrowLeft className="text-accent" height={40} width={40} />
                    </Link>
                    <div className="ring-accent flex flex-1 items-center justify-between gap-2 overflow-hidden rounded-lg ring">
                        <input
                            placeholder="Search"
                            value={query}
                            autoFocus
                            className="bg-transparent px-3 outline-none"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={Enter}
                        />
                        <button
                            onClick={() => handleProductSearch(query)}
                            className="bg-accent flex h-10 w-15 items-center justify-center">
                            <SearchIcon className="text-white" />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <h1></h1>
                    {query && (
                        <div className="flex flex-col rounded-lg bg-white p-4 shadow-sm">
                            {filteredProduct.length > 0 ? (
                                filteredProduct.map((item: any, index: number) => (
                                    <button
                                        key={`${item.id}-${index}`}
                                        onClick={() => handleProductClickSuggested(item.title)}
                                        className="border-b border-gray-100 py-2 text-start text-gray-700 italic last:border-0 hover:bg-gray-50 transition-colors"
                                    >
                                        {item.title}
                                    </button>
                                ))
                            ) : (
                                <p>
                                    No product
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default memo(SearchPage)