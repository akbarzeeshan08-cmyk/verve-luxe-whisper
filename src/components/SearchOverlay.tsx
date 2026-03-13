import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";

export const SearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const searchProducts = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, {
        first: 8,
        query: `title:${q}*`,
      });
      setResults(data?.data?.products?.edges || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchProducts(value), 300);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-foreground hover:text-muted-foreground transition-colors"
        aria-label="Search products"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 bg-background border-b border-border shadow-lg">
            <div className="container mx-auto px-6 lg:px-12 py-4">
              <div className="flex items-center gap-4">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent font-serif text-xl text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {(query.trim().length > 0) && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto pb-4">
                  {loading ? (
                    <p className="text-sm text-muted-foreground py-4">Searching...</p>
                  ) : results.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4">No products found for "{query}"</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {results.map((product) => {
                        const image = product.node.images.edges[0]?.node;
                        const price = product.node.priceRange.minVariantPrice;
                        return (
                          <Link
                            key={product.node.id}
                            to={`/product/${product.node.handle}`}
                            onClick={() => setIsOpen(false)}
                            className="group flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              {image && <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover" />}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-serif text-sm text-foreground truncate">{product.node.title}</h4>
                              <p className="text-sm font-semibold text-foreground">
                                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
