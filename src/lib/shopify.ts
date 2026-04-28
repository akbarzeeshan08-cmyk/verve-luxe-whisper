import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "uugijv-76.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "e79aa90d2278b54b4bfc985b7f793630";

// Shop-hosted login (Shop / Sign-in-with-Shop) — Shopify requires this to be hosted on their domain.
export const SHOPIFY_SHOP_LOGIN_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/account/login`;

export async function storefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {},
  customerAccessToken?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
  };
  if (customerAccessToken) headers["Shopify-Storefront-Buyer-Identity"] = customerAccessToken;

  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Storefront API requires an active Shopify plan.",
    });
    return null;
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(data.errors.map((e: { message: string }) => e.message).join(", "));
  return data;
}

/* ============= CUSTOMER AUTH ============= */

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email firstName lastName }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

const CUSTOMER_RECOVER = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      displayName
      phone
      createdAt
    }
  }
`;

export interface CustomerUserError {
  code?: string;
  field?: string[] | null;
  message: string;
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  phone?: string | null;
  createdAt?: string;
}

export interface AccessTokenResult {
  token: string;
  expiresAt: string;
}

function firstError(errors: CustomerUserError[] | undefined): string | null {
  if (!errors || errors.length === 0) return null;
  return errors[0].message;
}

export async function shopifySignUp(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
}): Promise<{ ok: boolean; error?: string }> {
  const data = await storefrontApiRequest(CUSTOMER_CREATE, { input });
  const errs = data?.data?.customerCreate?.customerUserErrors as CustomerUserError[];
  const err = firstError(errs);
  if (err) return { ok: false, error: err };
  // Auto sign-in after creation
  const tokenRes = await shopifySignIn({ email: input.email, password: input.password });
  if (!tokenRes.ok) return { ok: false, error: tokenRes.error };
  return { ok: true };
}

export async function shopifySignIn(input: {
  email: string;
  password: string;
}): Promise<{ ok: boolean; token?: AccessTokenResult; error?: string }> {
  const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, { input });
  const errs = data?.data?.customerAccessTokenCreate?.customerUserErrors as CustomerUserError[];
  const err = firstError(errs);
  if (err) return { ok: false, error: err };
  const t = data?.data?.customerAccessTokenCreate?.customerAccessToken;
  if (!t?.accessToken) return { ok: false, error: "Sign-in failed. Please try again." };
  return { ok: true, token: { token: t.accessToken, expiresAt: t.expiresAt } };
}

export async function shopifySignOut(token: string): Promise<void> {
  try {
    await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_DELETE, { customerAccessToken: token });
  } catch (e) {
    console.warn("Sign out failed:", e);
  }
}

export async function shopifyRecoverPassword(email: string): Promise<{ ok: boolean; error?: string }> {
  const data = await storefrontApiRequest(CUSTOMER_RECOVER, { email });
  const errs = data?.data?.customerRecover?.customerUserErrors as CustomerUserError[];
  const err = firstError(errs);
  if (err) return { ok: false, error: err };
  return { ok: true };
}

export async function shopifyFetchCustomer(token: string): Promise<ShopifyCustomer | null> {
  const data = await storefrontApiRequest(CUSTOMER_QUERY, { customerAccessToken: token });
  return (data?.data?.customer as ShopifyCustomer) ?? null;
}
