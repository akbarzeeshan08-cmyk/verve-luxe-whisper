import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const { data: products, isLoading } = useProducts();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!products) return [];
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => p.node.title.toLowerCase().includes(q) || p.node.description?.toLowerCase().includes(q))
      .slice(0, 8);
  }, [products, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md animate-fade-in">
      <div className="container mx-auto px-6 lg:px-12 pt-24">
        <button
          aria-label="Close search"
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground hover:text-accent"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none font-serif text-2xl placeholder:text-muted-foreground"
            />
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <div className="mt-8 space-y-2">
            {query && filtered.length === 0 && !isLoading && (
              <p className="text-muted-foreground text-sm">No products found.</p>
            )}
            {filtered.map((p) => {
              const img = p.node.images.edges[0]?.node;
              const price = p.node.priceRange.minVariantPrice;
              return (
                <Link
                  key={p.node.id}
                  to={`/product/${p.node.handle}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 hover:bg-secondary/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-secondary/20 overflow-hidden flex-shrink-0">
                    {img && <img src={img.url} alt={img.altText || p.node.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-base">{p.node.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;