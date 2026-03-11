import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from "@/lib/shopify";
import { Loader2, ShoppingBag } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center mb-16">
            <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">Shop</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Our Products</h1>
            <div className="w-12 h-px bg-accent mx-auto" />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-foreground mb-2">No products yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're curating our collection. Check back soon for premium leather goods crafted for your companion.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {products.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <article key={product.node.id} className="group">
                    <Link to={`/product/${product.node.handle}`} className="block">
                      <div className="relative overflow-hidden mb-6 bg-muted aspect-square">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                      </div>
                      <h3 className="font-serif text-xl text-foreground mb-1">{product.node.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.node.description}</p>
                      <p className="text-sm font-medium text-foreground tracking-wide">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                      </p>
                    </Link>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={isCartLoading}
                      variant="outline"
                      className="mt-4 w-full border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-300 text-xs tracking-widest uppercase"
                    >
                      {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Cart"}
                    </Button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Shop;
