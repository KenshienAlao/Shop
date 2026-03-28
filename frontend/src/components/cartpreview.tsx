import { useUpdateCart } from "@/hooks/useCart";
import { CartProps } from "@/services/cartService";
import { Product } from "@/services/productService";
import { notifyFailed } from "@/utils/toast";
import { Minus, Plus } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

interface CartItemProps {
    item: CartProps;
    toggleCheck: (id: number) => void;
    product: Product;
    isChecked: boolean;
}

export const CartPreview = memo(
    ({ item, toggleCheck, product, isChecked }: CartItemProps) => {
        const [isEdit, setIsEdit] = useState(false)
        const { updateCart } = useUpdateCart(item.product_id, item.qty);
        const [qty, setQty] = useState<number>(item.qty);

        const AddQty = useCallback(() => {
            setIsEdit(true)
            setQty((prev) => (prev < product.quantity ? prev + 1 : prev));
        }, [product.quantity]);

        const MinusQty = useCallback(() => {
            setIsEdit(true)
            setQty((prev) => (prev > 1 ? prev - 1 : prev));
        }, []);

        const updateQty = useCallback(async () => {
            try {
                await updateCart(item.product_id, qty);
            } catch (err: any) {
                notifyFailed(err.message);
            }
        }, [qty, updateCart])

        useEffect(() => {
            if (isEdit) {
                updateQty()
                setIsEdit(false)
            }
        }, [updateQty])

        return (
            <div
                className={`group ${isChecked ? "bg-accent/5 ring-accent/20 ring-1" : "bg-white"} flex items-center gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm transition-all hover:shadow-md`}
            >
                <div className="flex items-center">
                    <input
                        onChange={() => toggleCheck(item.product_id)}
                        type="checkbox"
                        checked={isChecked}
                        className="text-accent focus:ring-accent accent-accent hover:border-accent h-5 w-5 cursor-pointer rounded-md border-2 border-gray-200 transition-all"
                    />
                </div>

                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="line-clamp-1 text-lg font-bold text-gray-800">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-400"> stock: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-accent text-xl font-black">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400">
                                Total: ${(product.price * item.qty).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={AddQty}
                                    className="text-accent hover:text-red-500"
                                >
                                    <Plus size={16} />
                                </button>
                                <input
                                    type="number"
                                    value={qty}
                                    min={1}
                                    max={product.quantity}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    readOnly
                                    onFocus={(e) => e.target.blur}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="w-16 cursor-default rounded-md border border-gray-200 text-center text-sm select-none"
                                />
                                <button
                                    onClick={MinusQty}
                                    className="text-accent hover:text-red-500"
                                >
                                    <Minus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);