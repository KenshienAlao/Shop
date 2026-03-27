import {
  addToCart as addToCartService,
} from "@/services/cartService";
import { notifyFailed, notifySuccess } from "@/utils/toast";
import { useCallback } from "react";

export function useAddToCart() {
  const addToCart = useCallback(async (productId: number, quantity: number) => {
    try {
      const res = await addToCartService(productId, quantity);
      notifySuccess(res.message);
    } catch (err: unknown) {
      const error = err as Error;
      notifyFailed(error.message || "Failed to add product to cart");
    }
  }, []);

  return { addToCart };
}