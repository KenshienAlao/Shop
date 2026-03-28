import {
  addCartService,
  deleteCartsService,
  fetchToCart,
  updateCartService,
} from "@/services/cartService";
import { getProducts } from "@/services/productService";
import { notifyFailed, notifySuccess } from "@/utils/toast";
import { useCallback, useState } from "react";

export function useAddToCart() {
  const addToCart = useCallback(async (productId: number, quantity: number) => {
    try {
      const res = await addCartService(productId, quantity);
      notifySuccess(res.message);
    } catch (err: any) {
      notifyFailed(err.message);
    }
  }, []);

  return { addToCart };
}

export function useDeleteCart() {
  const deleteCart = useCallback(async (productId: number[]) => {
    try {
      const res = await deleteCartsService(productId);
      notifySuccess(res.message);
    } catch (err: any) {
      notifyFailed(err.message);
    }
  }, []);

  return { deleteCart };
}

export function useUpdateCart(productId: number, quantity: number) {
  const updateCart = useCallback(
    async (productId: number, quantity: number) => {
      try {
        const res = await updateCartService(productId, quantity);
        notifySuccess(res.message);
      } catch (err: any) {
        notifyFailed(err.message);
      }
    },
    [],
  );

  return { updateCart };
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
    } catch (err: any) {
      notifyFailed(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { showCart, isLoading };
}
