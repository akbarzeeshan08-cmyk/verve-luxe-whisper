import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";

const ProductCarousel = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 12 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 lg:px-12 bg-muted/30">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground font-sans">Loading products...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 px-6 lg:px-12 bg-muted/30">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground font-sans">No products found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 lg:px-12 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-accent">
            The Collection
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
            Our Products
          </h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => {
              const image = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              return (
                <CarouselItem
                  key={product.node.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link
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
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
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
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4" />
          <CarouselNext className="hidden sm:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
