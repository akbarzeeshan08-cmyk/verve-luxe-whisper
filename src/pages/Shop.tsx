import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ShoppingBag } from "lucide-react";
import { SEO } from "@/components/SEO";

const Shop = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Shop — Verve"
        description="The Verve collection of handcrafted leather pet accessories is coming soon."
        canonicalPath="/shop"
      />
      <Navbar />
      <section className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">Shop</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Coming Soon</h1>
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-md mx-auto">
              We're curating our collection. Check back soon for premium leather goods crafted for your companion.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Shop;
