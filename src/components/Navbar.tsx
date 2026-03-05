import { useState, useEffect, useRef } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { useAuthStore } from "@/stores/authStore";
import { logoutCustomer } from "@/lib/shopify-auth";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { customer, accessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY.current || currentY < 10);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    if (accessToken) {
      await logoutCustomer(accessToken);
    }
    clearAuth();
    toast.success("Signed out successfully");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="w-[72px]" />
        <a href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl lg:text-3xl tracking-wider text-foreground">
          VERVE
        </a>
        <div className="flex items-center gap-4">
          {customer ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  aria-label="Account menu"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase"
                >
                  {customer.firstName?.[0] || customer.email[0]}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-3">
                <div className="mb-3">
                  <p className="text-sm font-medium text-foreground truncate">
                    {customer.firstName
                      ? `${customer.firstName} ${customer.lastName || ""}`
                      : customer.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <button
              onClick={() => navigate("/account")}
              aria-label="Sign in"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <User size={20} />
            </button>
          )}
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
