import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEO } from "@/components/SEO";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const ProductListing = () => {
  const { data: products } = useProducts();

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Products — Verve"
        description="Discover the complete Verve collection of handcrafted leather collars, leashes, and tailored coats."
        canonicalPath="/product"
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
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-16">
            <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">
              Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              All Products
            </h1>
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every piece is handcrafted from the finest materials and built to last a lifetime.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {products.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductListing;
