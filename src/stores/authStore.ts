import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShopifyCustomer } from "@/lib/shopify-auth";

interface AuthState {
  accessToken: string | null;
  customer: ShopifyCustomer | null;
  setAuth: (token: string, customer: ShopifyCustomer) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      customer: null,
      setAuth: (accessToken, customer) => set({ accessToken, customer }),
      clearAuth: () => set({ accessToken: null, customer: null }),
    }),
    { name: "shopify-auth" }
  )
);
