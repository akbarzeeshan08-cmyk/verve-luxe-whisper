import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";

export function useShopifyProducts(query?: string, first = 50) {
  return useQuery({
    queryKey: ["shopify-products", query, first],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query || null });
      const edges = (data?.data?.products?.edges ?? []) as ShopifyProduct[];
      return edges;
    },
    staleTime: 60_000,
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      if (!handle) return null;
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.productByHandle ?? null;
    },
    enabled: !!handle,
  });
}