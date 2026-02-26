import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

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

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.node.variants.edges[selectedVariantIdx]?.node;
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
          <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 tracking-widest uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <div>
              <div className="aspect-square bg-muted overflow-hidden mb-4">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.node.title}
                    className="w-full h-full object-cover"
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
                      <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
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
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variantIdx = variants.findIndex(v =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => setSelectedVariantIdx(variantIdx >= 0 ? variantIdx : 0)}
                            className={`px-4 py-2 text-sm border transition-colors ${
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

              <Button
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant?.availableForSale}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase text-xs py-6"
                size="lg"
              >
                {isCartLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : !selectedVariant?.availableForSale ? (
                  "Sold Out"
                ) : (
                  "Add to Cart"
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
