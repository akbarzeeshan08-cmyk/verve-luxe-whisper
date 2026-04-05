import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

interface SimilarProductsProps {
  currentProductId: string;
  productType?: string;
}

const SimilarProducts = ({ currentProductId, productType }: SimilarProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const query = productType ? `product_type:${productType}` : undefined;
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 8, query });
        const all: ShopifyProduct[] = data?.data?.products?.edges || [];
        setProducts(all.filter(p => p.node.id !== currentProductId).slice(0, 4));
      } catch (e) {
        console.error("Failed to fetch similar products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [currentProductId, productType]);

  if (loading) {
    return (
      <section className="py-16 px-6 lg:px-12 bg-muted/30">
        <div className="container mx-auto flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-6 lg:px-12 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-accent">You May Also Like</span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">Similar Products</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const image = product.node.images.edges[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            return (
              <Link
                key={product.node.id}
                to={`/product/${product.node.handle}`}
                className="group block bg-card rounded-lg border shadow-sm overflow-hidden"
              >
                <div className="aspect-square overflow-hidden bg-secondary/10">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors mb-2">
                    {product.node.title}
                  </h3>
                  <p className="font-sans text-base font-semibold text-foreground">
                    {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
