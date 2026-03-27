export interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: Product[];
  userId: number;
}

export interface PaginatedProductResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(): Promise<PaginatedProductResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DUMMY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}
