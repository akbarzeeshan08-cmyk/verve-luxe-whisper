import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createCustomer, loginCustomer, getCustomer } from "@/lib/shopify-auth";
import { useAuthStore } from "@/stores/authStore";
import { ShoppingBag } from "lucide-react";

const SHOPIFY_STORE_DOMAIN = "verve-luxe-whisper-0w3sy.myshopify.com";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { errors: createErrors } = await createCustomer({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      });
      if (createErrors.length > 0) {
        toast.error(createErrors[0]);
        return;
      }
      const { accessToken, errors: loginErrors } = await loginCustomer(email, password);
      if (loginErrors.length > 0 || !accessToken) {
        toast.success("Account created! Please sign in.");
        return;
      }
      const customer = await getCustomer(accessToken);
      if (customer) {
        setAuth(accessToken, customer);
        toast.success(`Welcome, ${customer.firstName || customer.email}!`);
        navigate("/");
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="font-serif text-3xl tracking-wider text-foreground">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join VERVE for a premium experience
            </p>
          </div>

          <Button
            type="button"
            onClick={handleShopLogin}
            className="w-full h-12 bg-[#5a31f4] hover:bg-[#4b27cc] text-white font-medium text-base rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Sign up with Shop
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={5}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? "Please wait..." : "Create Account"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
