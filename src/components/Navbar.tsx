import { useState, useEffect, useRef, useCallback } from "react";
import { User } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SHOPIFY_STORE_DOMAIN = "verve-luxe-whisper-0w3sy.myshopify.com";

const openLoginPage = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

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
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Customer login"
              >
                <User className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-3 bg-card border border-border shadow-lg" align="end">
              <p className="text-xs text-muted-foreground font-medium px-1 mb-2 tracking-wide uppercase">Sign in to your account</p>
              <div className="space-y-2">
                <button
                  onClick={() => openLoginPopup(`https://${SHOPIFY_STORE_DOMAIN}/account/login`)}
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-[#5A31F4] hover:bg-[#4b28d4] transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M15.236 2.007a3.96 3.96 0 0 0-2.18.692L6.692 7.12a3.96 3.96 0 0 0-1.496 2.328l-1.56 7.14a3.96 3.96 0 0 0 .456 2.756 3.96 3.96 0 0 0 2.18.692h.004l6.364-4.42a3.96 3.96 0 0 0 1.496-2.328l1.56-7.14a3.96 3.96 0 0 0-.46-2.14z" fill="white"/>
                  </svg>
                  Sign in with Shop
                </button>
                <button
                  onClick={() => openLoginPopup(`https://${SHOPIFY_STORE_DOMAIN}/account/login`)}
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1f1f1f] bg-white border border-[#dadce0] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </button>
                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
                </div>
                <button
                  onClick={() => openLoginPopup(`https://${SHOPIFY_STORE_DOMAIN}/account/register`)}
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Create Account with Email
                </button>
              </div>
            </PopoverContent>
          </Popover>
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
