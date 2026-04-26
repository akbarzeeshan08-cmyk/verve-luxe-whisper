import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface Props {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const node = product.node;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title, position: "top-center" });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden mb-4 bg-secondary/20 aspect-square">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>
      <h3 className="font-serif text-lg text-foreground mb-1">{node.title}</h3>
      <p className="font-sans text-sm text-muted-foreground mb-3">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
      <button
        onClick={handleAdd}
        disabled={isLoading || !variant?.availableForSale}
        className="text-xs font-sans tracking-[0.25em] uppercase text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-3 h-3 animate-spin inline" /> : variant?.availableForSale ? "Add to Cart" : "Sold Out"}
      </button>
    </Link>
  );
};

export default ProductCard;