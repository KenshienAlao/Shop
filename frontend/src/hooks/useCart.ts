import { addToCartService } from "@/services/cartService";
import { notifyFailed, notifySuccess } from "@/utils/toast";
import { useCallback } from "react";

export function useAddToCart() {
  const addCart = useCallback(async (id: number, qty: number) => {
    try {
      const res = await addToCartService(id, qty);
      notifySuccess(res.message);
    } catch (err: any) {
      notifyFailed(err.message || "Failed to add product to cart");
    }
  }, []);
  return { addCart };
}
