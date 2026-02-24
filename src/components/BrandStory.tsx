import brandStoryImg from "@/assets/brand-story.jpg";

const BrandStory = () => {
  return (
    <section id="story" className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={brandStoryImg}
              alt="Artisan craftsman working on a premium leather collar in a warm-lit workshop"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="max-w-lg">
            <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">
              Our Heritage
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-8">
              Where Craft
              <br />
              Meets <span className="italic">Devotion</span>
            </h2>
            <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
              <p>
                Every Verve piece begins in our atelier, where master leather artisans hand-select
                the finest full-grain hides. Each collar, leash, and coat is a testament to the
                bond between you and your companion.
              </p>
              <p>
                Founded on the belief that pets deserve the same quality and elegance as their
                owners, Verve blends heritage craftsmanship with modern design — creating
                accessories that age beautifully, just like the love they represent.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-12">
              <div>
                <p className="font-serif text-3xl text-foreground">100%</p>
                <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mt-1">Full-Grain Leather</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-serif text-3xl text-foreground">Hand</p>
                <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mt-1">Stitched Details</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-serif text-3xl text-foreground">Brass</p>
                <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mt-1">Hardware</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
