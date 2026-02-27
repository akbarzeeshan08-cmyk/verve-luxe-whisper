import { User, ShoppingBag } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Empty left spacer for balance */}
        <div className="w-[72px]" />

        {/* Centered Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl lg:text-3xl tracking-wider text-foreground">
          VERVE
        </a>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <a href="/account" aria-label="Sign in" className="text-muted-foreground hover:text-foreground transition-colors">
            <User size={20} />
          </a>
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
