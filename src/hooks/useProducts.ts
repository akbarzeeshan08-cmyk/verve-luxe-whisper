import { useMemo } from "react";
import { getProducts, getProductByHandle } from "@/lib/products";

export function useProducts(filter?: { type?: string }) {
  const data = useMemo(() => getProducts(filter), [filter?.type]);
  return { data, isLoading: false };
}

export function useProduct(handle: string | undefined) {
  const data = useMemo(() => (handle ? getProductByHandle(handle) : null), [handle]);
  return { data, isLoading: false };
}
