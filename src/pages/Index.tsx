import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import ProductCarousel from "@/components/ProductCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <ProductCarousel />
      <Footer />
    </main>
  );
};

export default Index;
