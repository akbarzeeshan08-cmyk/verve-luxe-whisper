import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import brandStoryImg from "@/assets/brand-story.jpg";
import heroImage from "@/assets/hero-image.jpg";

const OurStory = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="A beautifully crafted Verve leather collar on a happy dog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 text-center max-w-2xl px-6">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-gold-light mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Born from <span className="italic">Love</span>
          </h1>
        </div>
      </section>

      {/* The Why */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-10 text-center">
            The Question That Started It All
          </h2>
          <div className="space-y-6 font-sans text-muted-foreground text-lg leading-relaxed text-justify">
            <p>
              It began with a simple observation — one that changed everything.
            </p>
            <p className="font-bold">
              We live in a world where we choose the finest things for ourselves. We wear
              watches that tell more than time. We carry bags that speak before we do. We
              pick the phone in our pocket with the same care we pick a suit. And yet, when
              it comes to the one who greets us at the door with unfiltered joy every single
              day — we settle.
            </p>
            <p className="font-serif text-2xl md:text-3xl text-foreground italic text-center py-6">
              "You wouldn't pair a bespoke suit with plastic shoes. Why would you dress your
              most loyal companion in anything less than they deserve?"
            </p>
            <p>
              That was the spark. The moment we realised that the beings who give us their
              unconditional best deserve our unconditional best in return. Not mass-produced
              accessories pulled off a warehouse shelf — but pieces crafted with the same
              intention, quality, and soul that we demand for ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="py-0">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
            <img
              src={brandStoryImg}
              alt="Artisan hand-stitching a premium leather collar"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div className="bg-primary flex items-center justify-center p-12 lg:p-20">
              <blockquote className="max-w-md">
                <p className="font-serif text-2xl md:text-3xl text-primary-foreground leading-snug mb-6">
                  They give us everything. We owe them something extraordinary.
                </p>
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-primary-foreground/50">
                  — The Verve Founders
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4 text-center">
            The Craft
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-10 text-center">
            Heritage Meets Devotion
          </h2>
          <div className="space-y-6 font-sans text-muted-foreground text-lg leading-relaxed text-justify">
            <p>
              Every Verve piece begins its life in our atelier, where master leather artisans
              hand-select the finest full-grain hides sourced from the most reputable tanneries.
              Each hide is inspected for character — the natural grain, the weight, the way it
              will age and soften with time, becoming more beautiful the longer it's worn.
            </p>
            <p>
              Our collars are hand-cut, hand-stitched, and hand-finished. The brass hardware
              is solid, never plated — because authenticity isn't a veneer, it's a foundation.
              Our leashes are built to endure years of morning walks and park adventures while
              developing a rich patina that tells your story together.
            </p>
            <p>
              And our coats? Designed with the same precision as the finest outerwear, tailored
              to move with your dog, not against them — because luxury should never compromise
              comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4 text-center">
            What We Stand For
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-16 text-center">
            Our Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                title: "Uncompromising Quality",
                description:
                  "We use only full-grain leather and solid brass. No shortcuts, no synthetics, no compromises. Every piece is built to last a lifetime.",
              },
              {
                title: "Crafted by Hand",
                description:
                  "Each item is hand-cut, hand-stitched, and hand-finished by artisans who take immense pride in their work. No two pieces are exactly alike.",
              },
              {
                title: "Love, Always",
                description:
                  "At the heart of everything we do is a deep respect for the bond between you and your companion. That love is what drives every stitch.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-serif text-xl text-foreground mb-4">{value.title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[30px] bg-primary text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground leading-tight mb-6">
            Give Them What They Deserve
          </h2>
          <p className="font-sans text-primary-foreground/70 text-lg mb-10">
            Explore our collections and discover accessories worthy of your companion.
          </p>
          <Link
            to="/#collections"
            className="inline-block bg-accent text-foreground font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Shop Collections
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OurStory;
