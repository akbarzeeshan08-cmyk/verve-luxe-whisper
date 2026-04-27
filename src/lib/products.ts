import collarsImg from "@/assets/collection-collars.jpg";
import leashesImg from "@/assets/collection-leashes.jpg";
import coatsImg from "@/assets/collection-coats.jpg";

export interface ProductVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface Product {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType?: string;
    tags?: string[];
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: { edges: Array<{ node: ProductVariant }> };
    options: Array<{ name: string; values: string[] }>;
  };
}

const CURRENCY = "USD";

const sizeVariants = (basePrice: number, idPrefix: string): { node: ProductVariant }[] =>
  ["Small", "Medium", "Large"].map((size, i) => ({
    node: {
      id: `${idPrefix}-${size.toLowerCase()}`,
      title: size,
      price: { amount: (basePrice + i * 10).toFixed(2), currencyCode: CURRENCY },
      availableForSale: true,
      selectedOptions: [{ name: "Size", value: size }],
    },
  }));

export const PRODUCTS: Product[] = [
  {
    node: {
      id: "p-heritage-collar",
      title: "Heritage Leather Collar",
      description:
        "Hand-stitched full-grain leather collar with solid brass hardware. A timeless piece designed to age beautifully with daily wear.",
      handle: "heritage-leather-collar",
      productType: "Collars",
      tags: ["collar", "leather", "bestseller"],
      priceRange: { minVariantPrice: { amount: "120.00", currencyCode: CURRENCY } },
      images: { edges: [{ node: { url: collarsImg, altText: "Premium leather dog collar with brass buckle" } }] },
      variants: { edges: sizeVariants(120, "heritage-collar") },
      options: [{ name: "Size", values: ["Small", "Medium", "Large"] }],
    },
  },
  {
    node: {
      id: "p-noir-collar",
      title: "Noir Signature Collar",
      description:
        "A sleek black leather collar finished with antique brass. Equal parts refined and resilient.",
      handle: "noir-signature-collar",
      productType: "Collars",
      tags: ["collar", "leather"],
      priceRange: { minVariantPrice: { amount: "135.00", currencyCode: CURRENCY } },
      images: { edges: [{ node: { url: collarsImg, altText: "Black leather dog collar" } }] },
      variants: { edges: sizeVariants(135, "noir-collar") },
      options: [{ name: "Size", values: ["Small", "Medium", "Large"] }],
    },
  },
  {
    node: {
      id: "p-braided-leash",
      title: "Braided Leather Leash",
      description:
        "A four-strand braided leather leash with a polished gold clip. Built for elegant control on every walk.",
      handle: "braided-leather-leash",
      productType: "Leashes",
      tags: ["leash", "leather", "bestseller"],
      priceRange: { minVariantPrice: { amount: "150.00", currencyCode: CURRENCY } },
      images: { edges: [{ node: { url: leashesImg, altText: "Braided leather dog leash with gold clip" } }] },
      variants: {
        edges: ["4 ft", "5 ft", "6 ft"].map((len, i) => ({
          node: {
            id: `braided-leash-${i}`,
            title: len,
            price: { amount: (150 + i * 15).toFixed(2), currencyCode: CURRENCY },
            availableForSale: true,
            selectedOptions: [{ name: "Length", value: len }],
          },
        })),
      },
      options: [{ name: "Length", values: ["4 ft", "5 ft", "6 ft"] }],
    },
  },
  {
    node: {
      id: "p-classic-leash",
      title: "Classic Bridle Leash",
      description:
        "Single-piece bridle leather leash with hand-stitched detailing. Made to last a lifetime.",
      handle: "classic-bridle-leash",
      productType: "Leashes",
      tags: ["leash", "leather"],
      priceRange: { minVariantPrice: { amount: "140.00", currencyCode: CURRENCY } },
      images: { edges: [{ node: { url: leashesImg, altText: "Classic bridle leather leash" } }] },
      variants: {
        edges: ["5 ft", "6 ft"].map((len, i) => ({
          node: {
            id: `classic-leash-${i}`,
            title: len,
            price: { amount: (140 + i * 10).toFixed(2), currencyCode: CURRENCY },
            availableForSale: true,
            selectedOptions: [{ name: "Length", value: len }],
          },
        })),
      },
      options: [{ name: "Length", values: ["5 ft", "6 ft"] }],
    },
  },
  {
    node: {
      id: "p-charcoal-coat",
      title: "Charcoal Wool Coat",
      description:
        "A tailored wool coat lined in soft cotton, finished with leather trim and brass buttons. Made for crisp mornings.",
      handle: "charcoal-wool-coat",
      productType: "Coats",
      tags: ["coat", "wool"],
      priceRange: { minVariantPrice: { amount: "220.00", currencyCode: CURRENCY } },
      images: { edges: [{ node: { url: coatsImg, altText: "Charcoal wool dog coat with brass buttons" } }] },
      variants: { edges: sizeVariants(220, "charcoal-coat") },
      options: [{ name: "Size", values: ["Small", "Medium", "Large"] }],
    },
  },
  {
    node: {
      id: "p-camel-coat",
      title: "Camel Trench Coat",
      description:
        "A camel-toned trench coat with a water-resistant finish and elegant leather collar.",
      handle: "camel-trench-coat",
      productType: "Coats",
      tags: ["coat"],
      priceRange: { minVariantPrice: { amount: "240.00", currencyCode: CURRENCY } },
      images: { edges: [{ node: { url: coatsImg, altText: "Camel trench coat for dogs" } }] },
      variants: { edges: sizeVariants(240, "camel-coat") },
      options: [{ name: "Size", values: ["Small", "Medium", "Large"] }],
    },
  },
];

export function getProducts(filter?: { type?: string }): Product[] {
  if (!filter?.type) return PRODUCTS;
  const t = filter.type.toLowerCase();
  return PRODUCTS.filter(
    (p) => p.node.productType?.toLowerCase() === t || p.node.tags?.includes(t)
  );
}

export function getProductByHandle(handle: string): Product | null {
  return PRODUCTS.find((p) => p.node.handle === handle) ?? null;
}
