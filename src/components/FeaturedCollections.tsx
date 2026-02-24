import collarsImg from "@/assets/collection-collars.jpg";
import leashesImg from "@/assets/collection-leashes.jpg";
import coatsImg from "@/assets/collection-coats.jpg";

const collections = [
  {
    title: "Collars",
    subtitle: "Premium Leather",
    description: "Hand-stitched from the finest full-grain leather with solid brass hardware.",
    image: collarsImg,
    alt: "Premium leather dog collar with brass buckle on marble surface",
  },
  {
    title: "Leashes",
    subtitle: "Braided Leather",
    description: "Durable, elegant leashes designed for comfort and lasting beauty.",
    image: leashesImg,
    alt: "Braided leather dog leash with gold clip on marble surface",
  },
  {
    title: "Dog Coats",
    subtitle: "Tailored Outerwear",
    description: "Stylish, weather-ready coats with leather trim and artisan details.",
    image: coatsImg,
    alt: "Charcoal wool dog coat with leather collar and brass buttons",
  },
];

const FeaturedCollections = () => {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4">
            Collections
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            The Essentials
          </h2>
          <div className="w-12 h-px bg-accent mx-auto" />
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {collections.map((item) => (
            <article
              key={item.title}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </div>
              <p className="text-xs font-sans tracking-[0.25em] uppercase text-accent mb-2">
                {item.subtitle}
              </p>
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <span className="inline-flex items-center text-sm font-sans tracking-widest uppercase text-foreground group-hover:text-accent transition-colors duration-300">
                Explore
                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
