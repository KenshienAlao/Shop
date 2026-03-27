import {
  addToCart as addToCartService,
  fetchToCart,
} from "@/services/cartService";
import { getProducts } from "@/services/productService";
import { notifyFailed, notifySuccess } from "@/utils/toast";
import { useCallback, useState } from "react";

export function useAddToCart() {
  const addToCart = useCallback(async (productId: number, quantity: number) => {
    try {
      const res = await addToCartService(productId, quantity);
      notifySuccess(res.message);
    } catch (err: unknown) {
      const error = err as Error;
      notifyFailed(error.message);
    }
  }, []);

  return { addToCart };
}

export function useShowCart() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const [cartData, productData] = await Promise.all([
        fetchToCart(),
        getProducts(),
      ]);
      const productID = cartData.cartItems.map((i) => i.product_id);
      const product = productData.carts.flatMap((i) => i.products);
      const userCart = product.filter((i) => productID.includes(i.id));
      const total = cartData.cartItems.length;
      return { userCart, total, cartItems: cartData.cartItems };
    } catch (err) {
      const error = err as Error;
      notifyFailed(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { showCart, isLoading };
}
