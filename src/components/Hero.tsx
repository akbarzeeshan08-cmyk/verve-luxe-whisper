import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Golden retriever wearing a premium Verve leather collar in an elegant living room"
          className="w-full h-full object-cover"
          loading="eager" />

        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-xl">
          <p
            className="text-sm font-sans tracking-[0.3em] uppercase text-gold-light mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}>

            Premium Pet Accessories
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}>

            Crafted for
            <br />
            <span className="italic text-gold-light">Distinction</span>
          </h1>
          <p
            className="font-sans text-cream/80 text-lg md:text-xl leading-relaxed mb-10 max-w-md opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}>

            Handcrafted leather collars, leashes & coats — where timeless elegance meets everyday adventure.
          </p>
          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}>

            <a
              href="#collections"
              className="inline-block bg-accent text-foreground font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors duration-300">

              Shop Collections
            </a>
            <a

              className="inline-block border border-cream/40 text-cream font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-cream/10 transition-colors duration-300" href="#our-story">

              Our Story
            </a>
          </div>
        </div>
      </div>
    </section>);

};

export default Hero;