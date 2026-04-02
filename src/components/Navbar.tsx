import { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";

const SHOPIFY_STORE_DOMAIN = "verve-luxe-whisper-0w3sy.myshopify.com";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY.current || currentY < 10);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="w-24" />
        <a href="/" className="font-serif text-2xl lg:text-3xl tracking-wider text-foreground">
          VERVE
        </a>
        <div className="w-24 flex items-center justify-end gap-4">
          <SearchOverlay />
          <a
            href={`https://${SHOPIFY_STORE_DOMAIN}/account/login`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Customer login"
          >
            <User className="h-5 w-5" />
          </a>
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
