import { useDeleteCart, useShowCart } from "@/hooks/useCart";
import { CartProps, fetchToCart } from "@/services/cartService";
import { Cart, Product } from "@/services/productService";
import { Loader2, Minus, Plus, TrainTrack, Trash2 } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CartPreview } from "../cartpreview";
import { notifyFailed } from "@/utils/toast";

function CartPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentCarts, setCurrentCarts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartProps[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const { showCart } = useShowCart();
  const { deleteCart } = useDeleteCart();
  const isAnyChecked = useMemo(() => checked.length > 0, [checked]);

  const fetchUserCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await showCart();
      if (result) {
        const { userCart, cartItems } = result;
        setCurrentCarts(userCart);
        setCartItems(cartItems);
      }
    } catch (error: any) {
      notifyFailed(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [showCart]);

  useEffect(() => {
    fetchUserCart();
  }, [fetchUserCart]);



  const toggleCheck = useCallback((id: number) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);
  
  const updateLocalQty = useCallback((productId: number, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, qty: newQty } : item,
      ),
    );
  }, []);

  const total = useMemo(() => cartItems.length, [cartItems]);

  const toggleAll = useCallback(() => {
    if (cartItems.length === 0) return;

    if (checked.length === cartItems.length) {
      setChecked([]);
    } else {
      setChecked(cartItems.map((item) => item.product_id));
    }
  }, [checked.length, cartItems]);

  const enrichedCartItems = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = currentCarts.find((p) => p.id === item.product_id);
        return { item, product };
      })
      .filter((i): i is { item: CartProps; product: Product } => !!i.product);
  }, [cartItems, currentCarts]);

  const checkedTotal = useMemo(() => {
    return enrichedCartItems
      .filter(({ item }) => checked.includes(item.product_id))
      .reduce((acc, { item, product }) => acc + product.price * item.qty, 0);
  }, [checked, enrichedCartItems]);

  const handleDelete = useCallback(async (checked: number[]) => {
    try {
      setIsLoading(true)
      await deleteCart(checked)
      setChecked([])
      await fetchUserCart()
    } catch (err: any) {
      notifyFailed(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }, [deleteCart, fetchUserCart])
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 pb-32">
      <div className="bg-accent sticky top-0 z-50 shadow-md">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
          <h1 className="text-xl font-bold text-white">
            Shopping Cart{" "}
            <span className="text-xl font-light text-white/80">({total})</span>
          </h1>
          {isAnyChecked && (
            <button onClick={() => handleDelete(checked)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white transition-all hover:bg-red-500 hover:shadow-lg active:scale-90">
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
            </button>
          )}
        </header>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-8">
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="h-24 w-24 shrink-0 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="h-6 w-1/3 rounded-md bg-gray-200" />
                    <div className="h-6 w-1/4 rounded-md bg-gray-200" />
                  </div>
                  <div className="h-4 w-1/6 rounded-md bg-gray-200" />
                </div>
              </div>
            ))
          ) : (
            <>
              {enrichedCartItems.map(({ item, product }) => (
                <CartPreview
                  key={item.id}
                  item={item}
                  onUpdateQty={updateLocalQty}
                  toggleCheck={toggleCheck}
                  product={product}
                  isChecked={checked.includes(item.product_id)}
                />
              ))}

              {!isLoading && cartItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="mb-4 rounded-full bg-white p-6 shadow-inner">
                    <svg
                      className="h-16 w-16 opacity-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="font-medium">No items found in your cart.</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="fixed right-0 bottom-15 left-0 z-50 border-t border-gray-100 bg-white/95 px-4 py-4 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all md:bottom-20">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-5 px-4">
            <div className="flex items-center gap-6">
              <label className="group flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    checked.length === cartItems.length && cartItems.length > 0
                  }
                  onChange={toggleAll}
                  className="text-accent focus:ring-accent accent-accent group-hover:border-accent h-5 w-5 rounded-md border-2 border-gray-200 transition-all"
                />
                <span className="text-sm font-bold tracking-tight text-gray-600 uppercase">
                  All
                </span>
              </label>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Total Amount
                </span>
                <span className="text-accent text-2xl font-black">
                  ${checkedTotal.toFixed(2)}
                </span>
              </div>

              <button
                className="bg-accent pointer-events-auto flex h-14 items-center gap-3 rounded-2xl px-8 text-sm font-black text-white shadow-[0_10px_20px_rgba(245,74,0,0.25)] transition-all hover:brightness-105 active:scale-95 disabled:opacity-50 disabled:grayscale"
                disabled={checked.length === 0}
              >
                <span>Check Out</span>
                <div className="h-6 w-px bg-white/20" />
                <span className="font-medium opacity-80">{checked.length}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div >
  );
}

export default memo(CartPage);
