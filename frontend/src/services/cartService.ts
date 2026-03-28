import { notifyFailed } from "@/utils/toast";
import { fetchWithAuth } from "./apiClient";

export async function addCartService(productId: number, quantity: number) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_CART}/add-to-cart/${productId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Productqty: quantity }),
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
}

export async function deleteCartsService(productID: number[]) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_CART}/delete-cart/${productID}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
}

export async function updateCartService(productID: number, quantity: number) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_CART}/update-cart/${productID}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: quantity }),
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
}

export interface CartProps {
  cart_id: number;
  id: number;
  product_id: number;
  qty: number;
}

export interface FetchToCartProps {
  cartItems: CartProps[];
}

export async function fetchToCart(): Promise<FetchToCartProps> {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_CART}/fetch-to-cart`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch cart");
  const data = await res.json();

  return data;
}
