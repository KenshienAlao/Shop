"use client";

import { GetProduct } from "@/services/productServices";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await GetProduct();
        const allProducts = data.carts.flatMap((item: any) => item.products);
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-dvh bg-gray-100">
      <div className="bg-accent sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          <Link href="/search">
            <ArrowLeft className="text-main" height={28} width={28} />
          </Link>
          <h1 className="text-main truncate text-lg font-semibold">
            Results for &quot;{query}&quot;
          </h1>
          <span className="text-main/70 ml-auto text-sm whitespace-nowrap">
            {filteredProducts.length} found
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-5 md:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="text-accent h-8 w-8 animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((item: any, index: number) => (
              <div
                key={`${item.id}-${index}`}
                className="overflow-hidden rounded-md bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {item.discountPercentage > 0 && (
                    <div className="bg-accent absolute top-2 right-0 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase md:px-2 md:py-1 md:text-xs">
                      -{Math.round(item.discountPercentage)}%
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-2.5 md:p-3">
                  <p className="line-clamp-2 min-h-10 text-xs text-gray-800 md:text-sm">
                    {item.title}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className="text-accent text-sm font-bold md:text-base">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg">No products found</p>
            <p className="mt-1 text-sm">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}
