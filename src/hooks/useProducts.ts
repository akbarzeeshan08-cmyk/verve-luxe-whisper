import { useMemo } from "react";
import { getProducts, getProductByHandle } from "@/lib/products";

export function useProducts(filter?: { type?: string }) {
  const data = useMemo(() => getProducts(filter), [filter?.type]);
  return { data, isLoading: false };
}

export function useProduct(handle: string | undefined) {
  const data = useMemo(() => {
    if (!handle) return null;
    const p = getProductByHandle(handle);
    return p ? p.node : null;
  }, [handle]);
  return { data, isLoading: false };
}
