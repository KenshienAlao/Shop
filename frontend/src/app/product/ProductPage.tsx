"use client";

import { useSeeProduct } from "@/hooks/useSeeProduct";
import { getProducts, Product, Cart } from "@/services/productService";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search_query") || "";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { product: navigateToProduct } = useSeeProduct();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        const allFetchedProducts = data.carts.flatMap((cart: Cart) => cart.products);
        setProducts(allFetchedProducts);
      } catch (error) {
        console.error("[ProductPage] Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter((item: Product) =>
      item.title.toLowerCase().includes(lowerQuery),
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      {/* Search Header */}
      <div className="bg-accent sticky top-0 z-50 shadow-md">
        <header className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          <Link href="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="text-white" size={24} />
          </Link>
          <Link
            href="/search"
            className="bg-white/90 backdrop-blur flex-1 flex max-w-xl items-center gap-2 rounded-xl p-3 shadow-inner hover:bg-white transition-all"
          >
            <Search className="text-gray-400" size={20} />
            <span className="text-accent font-semibold truncate">
                Results for "{searchQuery}"
            </span>
          </Link>
        </header>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="text-accent h-10 w-10 animate-spin" />
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Searching products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 animate-in fade-in duration-500">
            {filteredProducts.map((item: Product, index: number) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => navigateToProduct(item)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.discountPercentage > 0 && (
                    <div className="bg-red-500 absolute top-2 right-0 px-2 py-1 text-[10px] font-black text-white uppercase shadow-sm">
                      -{Math.round(item.discountPercentage)}%
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in-95 duration-300">
            <div className="bg-white p-8 rounded-full shadow-inner mb-6 ring-1 ring-gray-100">
                <Search size={48} className="text-gray-200" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">No products found</h2>
            <p className="mt-2 text-gray-500">We couldn't find any results for "{searchQuery}".<br/>Try searching with more general keywords.</p>
            <Link href="/search" className="mt-8 text-accent font-bold underline decoration-2 underline-offset-4">
                Back to Search
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

