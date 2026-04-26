import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import Footer from "@/components/Footer";
import NgoSupport from "@/components/NgoSupport";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Verve — Handcrafted Luxury Leather Pet Accessories"
        description="Discover handcrafted full-grain leather collars, leashes & dog coats. Timeless luxury pet accessories for the discerning dog owner."
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Verve",
          url: "https://verve-luxe-whisper.lovable.app",
          logo: "https://verve-luxe-whisper.lovable.app/og-image.jpg",
          description:
            "Handcrafted full-grain leather collars, leashes and dog coats. Luxury pet accessories for the discerning dog owner.",
        }}
      />
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <NgoSupport />
      <Footer />
    </main>
  );
};

export default Index;
