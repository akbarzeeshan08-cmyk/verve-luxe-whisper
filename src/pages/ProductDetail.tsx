import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimilarProducts from "@/components/SimilarProducts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { Loader2, ShoppingBag, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import sizeChartImage from "@/assets/dog_size_chart.png";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        const p = data?.data?.productByHandle;
        if (p) setProduct({ node: p });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    if (handle) fetchProduct();
  }, [handle]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setLightboxIdx(i => (i - 1 + (product?.node.images.edges.length || 1)) % (product?.node.images.edges.length || 1));
      else if (e.key === "ArrowRight") setLightboxIdx(i => (i + 1) % (product?.node.images.edges.length || 1));
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, product]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center py-20">
          <h1 className="font-serif text-3xl text-foreground mb-4">Product not found</h1>
          <Link to="/shop" className="text-accent hover:underline">Back to Shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const images = product.node.images.edges;
  const variants = product.node.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;

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
                <BreadcrumbLink asChild>
                  <Link to="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.node.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <div>
              <div
                className="aspect-square bg-muted overflow-hidden mb-4 cursor-zoom-in"
                onClick={() => { setLightboxIdx(selectedImage); setLightboxOpen(true); }}
              >
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.node.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-accent' : 'border-transparent'}`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || ""}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">{product.node.title}</h1>
              {selectedVariant && (
                <p className="text-2xl text-foreground mb-6">
                  {selectedVariant.price.currencyCode} {parseFloat(selectedVariant.price.amount).toFixed(2)}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed mb-8">{product.node.description}</p>

              {/* Variant selection */}
              {product.node.options.map((option) => (
                option.values.length > 1 && (
                  <div key={option.name} className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-xs tracking-widest uppercase text-muted-foreground">{option.name}</label>
                      {option.name.toLowerCase() === 'size' && (
                        <button
                          onClick={() => setSizeGuideOpen(true)}
                          className="text-xs text-accent underline hover:text-accent/80 transition-colors"
                        >
                          Size Guide
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variantIdx = variants.findIndex(v =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => setSelectedVariantIdx(variantIdx >= 0 ? variantIdx : 0)}
                            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                              variantIdx === selectedVariantIdx
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border text-foreground hover:border-foreground'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}

              {/* Quantity & Add to Cart */}
              {selectedVariant && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Quantity</label>
                    <div className="flex items-center gap-2 w-fit">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setQuantity(q => q + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-full h-12 text-base rounded-full"
                    size="lg"
                    disabled={cartLoading || !selectedVariant.availableForSale}
                    onClick={async () => {
                      await addItem({
                        product: product!,
                        variantId: selectedVariant.id,
                        variantTitle: selectedVariant.title,
                        price: selectedVariant.price,
                        quantity,
                        selectedOptions: selectedVariant.selectedOptions || [],
                      });
                      toast.success(`${product!.node.title} added to cart`, { position: "top-center" });
                      setQuantity(1);
                    }}
                  >
                    {cartLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : !selectedVariant.availableForSale ? "Sold Out" : "Add to Cart"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setLightboxOpen(false)}>
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 hover:bg-background transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + images.length) % images.length); }}
              className="absolute left-4 z-10 rounded-full bg-background/80 p-3 hover:bg-background transition-colors"
            >
              <Minus className="h-5 w-5 text-foreground rotate-0" style={{ display: 'none' }} />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}

          {/* Image */}
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={images[lightboxIdx]?.node.url}
              alt={images[lightboxIdx]?.node.altText || product.node.title}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg select-none pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % images.length); }}
              className="absolute right-4 z-10 rounded-full bg-background/80 p-3 hover:bg-background transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === lightboxIdx ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setSizeGuideOpen(false)}>
          <div className="relative bg-background rounded-lg shadow-xl max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-3 right-3 rounded-full p-1 hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <img src={sizeChartImage} alt="Dog Collar Size Chart" className="w-full rounded-lg" />
          </div>
        </div>
      )}

      <SimilarProducts currentProductId={product.node.id} />
      <Footer />
    </main>
  );
};

export default ProductDetail;
