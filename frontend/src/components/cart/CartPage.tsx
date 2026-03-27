import { CartProps, fetchToCart } from "@/services/cartService";
import { getProducts, Product } from "@/services/productService";
import { useEffect, useState } from "react";
export default function CartPage() {

  const [currentCarts, setCurrentCarts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartProps[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const compateTheProductID = async () => {
      try {
        const [cartData, productData] = await Promise.all([
          fetchToCart(),
          getProducts()
        ])
        setTotal(cartData.cartItems.length);
        const productID = cartData.cartItems.flatMap(i => i.product_id)
        const product = productData.carts.flatMap(i => i.products)
        const test = product.filter(i => productID.includes(i.id))
        setCurrentCarts(test)
        setCartItems(cartData.cartItems)
      } catch (err) {
        console.log(err)
      }
    }
    compateTheProductID();
  }, [])



  return (
    <div className="flex w-full flex-col bg-gray-50 min-h-screen">
      <div className="bg-accent sticky top-0 z-50 shadow-md">
        <header className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          <h1 className="text-white text-xl font-bold mx-15">Shopping Cart <span className="text-white/80 text-xl font-light">({total})</span></h1>
        </header>
      </div>
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        <div className="space-y-4">
          {cartItems.map((item, index) => {
            const product = currentCarts.find((p) => p.id === item.product_id);
            if (!product) return null;

            return (
              <div
                key={`${item.id}-${index}`}
                className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{product.title}</h3>
                      <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-semibold">Quantity: {item.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-accent text-xl font-black">${product.price.toFixed(2)}</p>
                      <p className="text-gray-400 text-[10px] font-bold">Total: ${(product.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}

          {cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="mb-4 bg-white p-6 rounded-full shadow-inner">
                <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-medium">No items found in your cart.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}