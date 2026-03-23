import { useRouter } from "next/navigation";

export function useSeeProduct() {
  const router = useRouter();
  const product = (item: any) => {
    const encoded = encodeURIComponent(item.id);
    router.push(`/showproduct?q=${encoded}`);
  };

  return { product };
}
