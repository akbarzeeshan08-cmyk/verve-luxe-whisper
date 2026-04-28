import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthStore } from "@/stores/authStore";
import { SHOPIFY_SHOP_LOGIN_URL } from "@/lib/shopify";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(72);
const nameSchema = z.string().trim().min(1).max(60);

type Mode = "signin" | "signup" | "recover";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: Props) => {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);
  const recover = useAuthStore((s) => s.recover);

  const reset = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleClose = (next: boolean) => {
    if (!next) {
      reset();
      setMode("signin");
    }
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailParsed = emailSchema.safeParse(email);
    if (!emailParsed.success) {
      toast.error(emailParsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "recover") {
        const res = await recover(emailParsed.data);
        if (!res.ok) toast.error(res.error || "Could not send reset email");
        else {
          toast.success("Check your inbox for a password reset link");
          setMode("signin");
        }
        return;
      }

      const passwordParsed = passwordSchema.safeParse(password);
      if (!passwordParsed.success) {
        toast.error(passwordParsed.error.issues[0].message);
        return;
      }

      if (mode === "signup") {
        const fn = nameSchema.safeParse(firstName);
        const ln = nameSchema.safeParse(lastName);
        if (!fn.success || !ln.success) {
          toast.error("Please enter your first and last name");
          return;
        }
        const res = await signUp({
          email: emailParsed.data,
          password: passwordParsed.data,
          firstName: fn.data,
          lastName: ln.data,
        });
        if (!res.ok) toast.error(res.error || "Sign up failed");
        else {
          toast.success("Welcome to Verve");
          handleClose(false);
        }
      } else {
        const res = await signIn(emailParsed.data, passwordParsed.data);
        if (!res.ok) toast.error(res.error || "Sign in failed");
        else {
          toast.success("Welcome back");
          handleClose(false);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleShopLogin = () => {
    // Shop / Sign in with Shop must be hosted by Shopify (security requirement).
    window.location.href = SHOPIFY_SHOP_LOGIN_URL;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {mode === "signin" && "Sign In"}
            {mode === "signup" && "Create Account"}
            {mode === "recover" && "Reset Password"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin" && "Welcome back to Verve."}
            {mode === "signup" && "Join the Verve family."}
            {mode === "recover" && "Enter your email to receive a reset link."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {mode !== "recover" && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
                minLength={8}
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-foreground hover:bg-gold-light tracking-widest uppercase text-xs py-5"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === "signin" ? (
              "Sign In"
            ) : mode === "signup" ? (
              "Create Account"
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {mode !== "recover" && (
          <>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleShopLogin}
              variant="outline"
              className="w-full tracking-widest uppercase text-xs py-5 border-foreground hover:bg-secondary/40"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue with Shop
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">
              Shop sign-in is securely hosted by Shopify.
            </p>
          </>
        )}

        <div className="text-center text-sm text-muted-foreground space-y-1 pt-2">
          {mode === "signin" && (
            <>
              <button type="button" onClick={() => setMode("recover")} className="hover:text-accent underline-offset-4 hover:underline">
                Forgot password?
              </button>
              <p>
                New to Verve?{" "}
                <button type="button" onClick={() => setMode("signup")} className="text-accent hover:underline">
                  Create an account
                </button>
              </p>
            </>
          )}
          {mode === "signup" && (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("signin")} className="text-accent hover:underline">
                Sign in
              </button>
            </p>
          )}
          {mode === "recover" && (
            <button type="button" onClick={() => setMode("signin")} className="hover:text-accent underline-offset-4 hover:underline">
              Back to sign in
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
