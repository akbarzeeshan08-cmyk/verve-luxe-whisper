import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { SEO } from "@/components/SEO";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Account = () => {
  const { customer, token, signOut, refreshCustomer } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/", { replace: true });
    else refreshCustomer();
  }, [token, navigate, refreshCustomer]);

  if (!customer) return null;

  return (
    <main className="min-h-screen bg-background">
      <SEO title="My Account — Verve" description="Manage your Verve account." canonicalPath="/account" />
      <Navbar />
      <section className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-3xl">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Account</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">Welcome</p>
            <h1 className="font-serif text-4xl text-foreground mb-2">
              {customer.firstName || customer.displayName || "Hello"}
            </h1>
            <div className="w-12 h-px bg-accent mx-auto" />
          </div>

          <div className="border border-border p-8 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
              <p className="font-sans">{customer.email}</p>
            </div>
            {(customer.firstName || customer.lastName) && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Name</p>
                <p className="font-sans">{[customer.firstName, customer.lastName].filter(Boolean).join(" ")}</p>
              </div>
            )}
            {customer.phone && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                <p className="font-sans">{customer.phone}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="tracking-widest uppercase text-xs"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Account;
