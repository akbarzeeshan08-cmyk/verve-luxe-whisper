import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ShoppingBag } from "lucide-react";
import { SEO } from "@/components/SEO";

const CATEGORY_META: Record<string, { title: string; subtitle: string; description: string }> = {
  collars: {
    title: "Collars",
    subtitle: "Premium Leather",
    description: "Hand-stitched from the finest full-grain leather with solid brass hardware.",
  },
  leashes: {
    title: "Leashes",
    subtitle: "Braided Leather",
    description: "Durable, elegant leashes designed for comfort and lasting beauty.",
  },
  "dog-coats": {
    title: "Dog Coats",
    subtitle: "Tailored Outerwear",
    description: "Stylish, weather-ready coats with leather trim and artisan details.",
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const meta = category ? CATEGORY_META[category] : undefined;

  if (!meta) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-6 text-center">
          <h1 className="font-serif text-4xl text-foreground">Category not found</h1>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={`${meta.title} — ${meta.subtitle} | Verve`}
        description={meta.description}
        canonicalPath={`/collections/${category}`}
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
                <BreadcrumbPage>{meta.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">{meta.subtitle}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{meta.title}</h1>
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-lg mx-auto">{meta.description}</p>
            <p className="text-muted-foreground mt-6">Coming soon.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CategoryPage;
