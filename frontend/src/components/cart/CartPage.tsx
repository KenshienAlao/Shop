import { useShowCart } from "@/hooks/useCart";
import { CartProps } from "@/services/cartService";
import { Product } from "@/services/productService";
import { Trash2 } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

const CartItem = memo(
  ({
    item,
    product,
    isChecked,
    onToggle,
  }: {
    item: CartProps;
    product: Product;
    isChecked: boolean;
    onToggle: (id: number) => void;
  }) => (
    <div
      className={`group ${isChecked ? "bg-accent/5 ring-accent/20 ring-1" : "bg-white"} flex items-center gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm transition-all hover:shadow-md`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(item.id)}
        className="text-accent h-5 w-5 cursor-pointer rounded-md border-2 border-gray-200"
      />
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-gray-800">
              {product.title}
            </h3>
            <p className="mt-1 text-xs font-semibold text-gray-400">
              QTY: {item.qty}
            </p>
          </div>
          <div className="text-right">
            <p className="text-accent text-xl font-black">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-[10px] font-bold text-gray-400">
              Total: ${(product.price * item.qty).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
);



/**
 * MAIN PAGE COMPONENT
 */
function CartPage() {
  const { showCart, isLoading } = useShowCart();
  const [data, setData] = useState<{
    userCart: Product[];
    cartItems: CartProps[];
  } | null>(null);
  const [checked, setChecked] = useState<number[]>([]);
  useEffect(() => {
    showCart().then(
      (res) =>
        res && setData({ userCart: res.userCart, cartItems: res.cartItems }),
    );
  }, [showCart]);

  const enrichedItems = useMemo(
    () =>
      data?.cartItems
        .map((item) => ({
          item,
          product: data.userCart.find((p) => p.id === item.product_id)!,
        }))
        .filter((i) => i.product) || [],
    [data],
  );

  const checkedTotal = useMemo(
    () =>
      enrichedItems
        .filter((i) => checked.includes(i.item.id))
        .reduce((a, b) => a + b.product.price * b.item.qty, 0),
    [checked, enrichedItems],
  );
  const toggleCheck = useCallback(
    (id: number) =>
      setChecked((p) =>
        p.includes(id) ? p.filter((i) => i !== id) : [...p, id],
      ),
    [],
  );

  const toggleAll = () =>
    setChecked(
      checked.length === enrichedItems.length
        ? []
        : enrichedItems.map((i) => i.item.id),
    );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-32">
      <header className="bg-accent sticky top-0 z-50 flex justify-between p-5 px-8 text-white shadow-md">
        <h1 className="text-xl font-bold">
          Shopping Cart{" "}
          <span className="font-light opacity-80">
            ({enrichedItems.length})
          </span>
        </h1>
        {checked.length > 0 && (
          <button className="rounded-xl bg-white/20 p-2 transition-all hover:bg-red-500 active:scale-90">
            <Trash2 size={20} />
          </button>
        )}
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-4 p-8">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-gray-200" />
            ))}
          </div>
        ) : enrichedItems.length === 0 ? (
          <p className="py-20 text-center text-gray-400">Your cart is empty.</p>
        ) : (
          enrichedItems.map((obj) => (
            <CartItem
              key={obj.item.id}
              {...obj}
              isChecked={checked.includes(obj.item.id)}
              onToggle={toggleCheck}
            />
          ))
        )}
      </main>
      <footer className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white/95 p-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
          <label className="flex cursor-pointer items-center gap-3 p-2">
            <input
              type="checkbox"
              checked={
                checked.length === enrichedItems.length &&
                enrichedItems.length > 0
              }
              onChange={toggleAll}
              className="h-5 w-5"
            />
            <span className="text-sm font-bold text-gray-500">SELECT ALL</span>
          </label>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400">
                TOTAL AMOUNT
              </p>
              <p className="text-accent text-2xl font-black">
                ${checkedTotal.toFixed(2)}
              </p>
            </div>
            <button
              disabled={checked.length === 0}
              className="bg-accent h-14 rounded-2xl px-8 text-sm font-black text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              CHECK OUT ({checked.length})
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default memo(CartPage);
