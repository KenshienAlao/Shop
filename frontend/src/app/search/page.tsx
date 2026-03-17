"use client";

import Searchbox from "@/components/searchbox";
import { GetProduct } from "@/services/productServices";
import { ArrowLeft, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchInitial() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);

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

  const filteredProduct = products.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="container-parent min-h-dvh bg-gray-200">
        <div className="bg-main flex items-center justify-start gap-5 px-4 py-2">
          <Link href="/dashboard">
            <ArrowLeft className="text-accent" height={40} width={40} />
          </Link>
          <div className="ring-accent flex flex-1 items-center justify-between gap-2 overflow-hidden rounded-lg ring">
            <Searchbox query={query} setQuery={setQuery} />
            <div className="bg-accent flex h-10 w-15 items-center justify-center">
              <SearchIcon className="text-white" />
            </div>
          </div>
        </div>

        <div className="p-4">
          {query && (
            <div className="flex flex-col rounded-lg bg-white p-4 shadow-sm">
              {filteredProduct.length > 0 ? (
                filteredProduct.map((item: any, index: number) => (
                  <button
                    key={`${item.id}-${index}`}
                    className="border-b border-gray-100 py-2 text-start text-gray-700 italic last:border-0"
                  >
                    {item.title}
                  </button>
                ))
              ) : (
                <div>nothing</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
