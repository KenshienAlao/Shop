"use client";
import Link from "next/link";
import { MessageCircleMore, Search } from "lucide-react";
import { GetProduct } from "@/services/productServices";
import { useEffect, useState } from "react";

export default function Home() {
  const [product, setProduct] = useState<any[]>([])


  useEffect(() => {
    const fetchProduct = async () => {
      const data = await GetProduct();
      const allProduct = data.carts.flatMap((item: any) => item.products)
      setProduct(allProduct);
    }
    fetchProduct();
  }, [])

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="bg-accent sticky top-0 z-50 flex">
          <header className="flex w-full items-center justify-around px-2 py-3">
            <Link
              href="/search"
              className="bg-main flex w-90 items-center gap-2 rounded-lg p-3"
            >
              <Search className="text-subforground" />
              <span className="text-accent">Search</span>
            </Link>
            <button>
              <MessageCircleMore className="text-main" size={40} />
            </button>
          </header>
        </div>
        <div className="flex">
          <div className="grid flex-1 grid-cols-2 gap-2 px-5 py-5">
            {product.map((item: any, index: number) => (
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
                    <div className="bg-accent absolute right-0 top-2 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
                      -{Math.round(item.discountPercentage)}%
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-2.5">
                  <p className="line-clamp-2 min-h-10 text-xs text-gray-800">
                    {item.title}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className="text-accent font-bold text-sm">
                      ${item.price}
                    </p>
                    <span className="text-[10px] text-gray-400">
                      Sold {Math.floor(Math.random() * 100)}+
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
