export async function addToCartService(productID: number, Productqty: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_CART}/add-to-cart/${productID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ Productqty }),
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
}
