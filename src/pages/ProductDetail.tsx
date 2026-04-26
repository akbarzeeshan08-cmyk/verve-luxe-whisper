import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useShopifyProduct(handle);
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center pt-40">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-6 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Product not found</h1>
          <Link to="/shop" className="text-accent hover:underline">Back to Shop</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const variants = product.variants.edges;
  const variant = variants[variantIdx]?.node;
  const images = product.images.edges;
  const currentImage = images[imgIdx]?.node || images[0]?.node;
  const description = (product.description || "").slice(0, 160);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={`${product.title} — Verve`}
        description={description || `Shop ${product.title} from Verve.`}
        canonicalPath={`/product/${product.handle}`}
        image={currentImage?.url}
        type="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: currentImage?.url,
          offers: {
            "@type": "Offer",
            price: variant?.price.amount,
            priceCurrency: variant?.price.currencyCode,
            availability: variant?.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }}
      />
      <Navbar />
      <section className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/shop">Shop</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{product.title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-secondary/20 overflow-hidden mb-4">
                {currentImage && (
                  <img src={currentImage.url} alt={currentImage.altText || product.title} className="w-full h-full object-cover" />
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`aspect-square overflow-hidden border ${i === imgIdx ? "border-accent" : "border-transparent"}`}
                    >
                      <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-serif text-4xl text-foreground mb-3">{product.title}</h1>
              <p className="font-serif text-2xl text-foreground mb-6">
                {variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
                {product.description}
              </p>

              {variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-xs font-sans tracking-[0.25em] uppercase text-accent mb-3">Variant</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v: { node: { id: string; title: string } }, i: number) => (
                      <button
                        key={v.node.id}
                        onClick={() => setVariantIdx(i)}
                        className={`px-4 py-2 text-sm border transition-colors ${
                          i === variantIdx ? "border-accent text-foreground" : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleAdd}
                disabled={isCartLoading || !variant?.availableForSale}
                className="w-full bg-accent text-foreground hover:bg-gold-light tracking-widest uppercase text-sm py-6"
              >
                {isCartLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : variant?.availableForSale ? (
                  "Add to Cart"
                ) : (
                  "Sold Out"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductDetail;
