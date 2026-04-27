import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex-1" />
          <a href="/" className="font-serif text-2xl lg:text-3xl tracking-wider text-foreground">
            VERVE
          </a>
          <div className="flex-1 flex items-center justify-end gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-foreground hover:text-accent transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="text-foreground hover:text-accent transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <CartDrawer />
          </div>
        </nav>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
