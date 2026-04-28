import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  shopifySignIn,
  shopifySignUp,
  shopifySignOut,
  shopifyFetchCustomer,
  shopifyRecoverPassword,
  ShopifyCustomer,
} from "@/lib/shopify";

interface AuthStore {
  token: string | null;
  expiresAt: string | null;
  customer: ShopifyCustomer | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (input: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  recover: (email: string) => Promise<{ ok: boolean; error?: string }>;
  refreshCustomer: () => Promise<void>;
}

function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return new Date(expiresAt).getTime() <= Date.now();
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: null,
      customer: null,
      isLoading: false,

      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await shopifySignIn({ email, password });
          if (!res.ok || !res.token) return { ok: false, error: res.error };
          set({ token: res.token.token, expiresAt: res.token.expiresAt });
          const customer = await shopifyFetchCustomer(res.token.token);
          set({ customer });
          return { ok: true };
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (input) => {
        set({ isLoading: true });
        try {
          const res = await shopifySignUp(input);
          if (!res.ok) return { ok: false, error: res.error };
          // signUp auto signs in; fetch token via signIn flow inside helper. Re-sign here to capture token.
          const signInRes = await shopifySignIn({ email: input.email, password: input.password });
          if (!signInRes.ok || !signInRes.token) return { ok: false, error: signInRes.error };
          set({ token: signInRes.token.token, expiresAt: signInRes.token.expiresAt });
          const customer = await shopifyFetchCustomer(signInRes.token.token);
          set({ customer });
          return { ok: true };
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        const { token } = get();
        if (token) await shopifySignOut(token);
        set({ token: null, expiresAt: null, customer: null });
      },

      recover: async (email) => shopifyRecoverPassword(email),

      refreshCustomer: async () => {
        const { token, expiresAt } = get();
        if (!token || isExpired(expiresAt)) {
          set({ token: null, expiresAt: null, customer: null });
          return;
        }
        try {
          const customer = await shopifyFetchCustomer(token);
          if (!customer) set({ token: null, expiresAt: null, customer: null });
          else set({ customer });
        } catch {
          set({ token: null, expiresAt: null, customer: null });
        }
      },
    }),
    {
      name: "verve-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ token: s.token, expiresAt: s.expiresAt, customer: s.customer }),
    }
  )
);
