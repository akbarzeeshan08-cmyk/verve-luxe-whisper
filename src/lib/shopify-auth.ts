import { storefrontApiRequest } from "./shopify";

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors {
        field
        message
      }
    }
  }
`;

export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export async function createCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): Promise<{ customer: ShopifyCustomer | null; errors: string[] }> {
  const data = await storefrontApiRequest(CUSTOMER_CREATE_MUTATION, { input });

  // Handle top-level GraphQL errors (e.g. missing access scopes)
  if (data?.errors && Array.isArray(data.errors)) {
    const accessDenied = data.errors.some(
      (e: { extensions?: { code?: string } }) => e.extensions?.code === "ACCESS_DENIED"
    );
    if (accessDenied) {
      return {
        customer: null,
        errors: [
          "Account creation is not currently available. Please use 'Sign up with Shop' instead, or contact the store owner.",
        ],
      };
    }
    return {
      customer: null,
      errors: data.errors.map((e: { message: string }) => e.message),
    };
  }

  const userErrors = data?.data?.customerCreate?.customerUserErrors || [];
  if (userErrors.length > 0) {
    return { customer: null, errors: userErrors.map((e: { message: string }) => e.message) };
  }
  return { customer: data?.data?.customerCreate?.customer, errors: [] };
}

export async function loginCustomer(email: string, password: string): Promise<{
  accessToken: string | null;
  expiresAt: string | null;
  errors: string[];
}> {
  const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
    input: { email, password },
  });

  if (data?.errors && Array.isArray(data.errors)) {
    return { accessToken: null, expiresAt: null, errors: data.errors.map((e: { message: string }) => e.message) };
  }

  const userErrors = data?.data?.customerAccessTokenCreate?.customerUserErrors || [];
  if (userErrors.length > 0) {
    return { accessToken: null, expiresAt: null, errors: userErrors.map((e: { message: string }) => e.message) };
  }
  const token = data?.data?.customerAccessTokenCreate?.customerAccessToken;
  return { accessToken: token?.accessToken || null, expiresAt: token?.expiresAt || null, errors: [] };
}

export async function getCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
  try {
    const data = await storefrontApiRequest(CUSTOMER_QUERY, { customerAccessToken: accessToken });
    return data?.data?.customer || null;
  } catch {
    return null;
  }
}

export async function logoutCustomer(accessToken: string): Promise<void> {
  try {
    await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_DELETE, { customerAccessToken: accessToken });
  } catch {
    // ignore
  }
}
