export interface ProductsProps {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  quantity: number;
}

export interface CartsProps {
  id: number;
  products: ProductsProps[];
  userId: number;
}

export interface GetProductProps {
  carts: CartsProps[];
  total: number;
  skip: number;
  limit: number;
}

export async function GetProduct(): Promise<GetProductProps> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DUMMY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();

  return data;
}
