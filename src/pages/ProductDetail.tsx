import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag } from "lucide-react";
import { SEO } from "@/components/SEO";

const ProductDetail = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Product — Verve"
        description="Verve's handcrafted leather pet accessories are coming soon."
        canonicalPath="/product"
      />
      <Navbar />
      <section className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto text-center py-20">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Coming Soon</h1>
          <div className="w-12 h-px bg-accent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Our products will be available shortly. Stay tuned.
          </p>
          <Link to="/" className="text-accent hover:underline">Back to Home</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductDetail;
