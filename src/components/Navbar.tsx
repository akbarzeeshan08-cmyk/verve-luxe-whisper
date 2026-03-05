import { useState, useEffect, useRef } from "react";
import { User, LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { useAuthStore } from "@/stores/authStore";
import { loginCustomer, getCustomer, logoutCustomer } from "@/lib/shopify-auth";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SHOPIFY_STORE_DOMAIN = "verve-luxe-whisper-0w3sy.myshopify.com";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { customer, accessToken, setAuth, clearAuth } = useAuthStore();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { accessToken: token, errors } = await loginCustomer(email, password);
      if (errors.length > 0) {
        toast.error(errors[0]);
        return;
      }
      if (!token) {
        toast.error("Login failed. Please try again.");
        return;
      }
      const cust = await getCustomer(token);
      if (cust) {
        setAuth(token, cust);
        toast.success(`Welcome back, ${cust.firstName || cust.email}!`);
        setLoginOpen(false);
        setEmail("");
        setPassword("");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShopLogin = () => {
    window.open(
      `https://shopify.com/authentication/${SHOPIFY_STORE_DOMAIN}/login`,
      "_blank"
    );
  };

  const handleCreateAccount = () => {
    setLoginOpen(false);
    navigate("/account");
  };

  return (
    <>
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
                onClick={() => setLoginOpen(true)}
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

      {/* Sign-in Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-wider text-center">Sign In</DialogTitle>
            <DialogDescription className="text-center">Welcome back to VERVE</DialogDescription>
          </DialogHeader>

          <Button
            type="button"
            onClick={handleShopLogin}
            className="w-full h-12 bg-[#5a31f4] hover:bg-[#4b27cc] text-white font-medium text-base rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Log in with Shop
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                required
                minLength={5}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? "Please wait..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={handleCreateAccount}
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Create one
            </button>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
