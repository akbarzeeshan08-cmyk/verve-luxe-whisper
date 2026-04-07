const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 lg:py-[40px]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl tracking-wider mb-4">VERVE</h3>
            <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed">
              Premium handcrafted leather accessories for the discerning dog owner.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.25em] uppercase mb-6 text-primary-foreground/40 font-semibold">
              Shop
            </h4>
            <ul className="space-y-3">
              {["Collars", "Leashes", "Dog Coats", "New Arrivals"].map((item) =>
              <li key={item}>
                  <a href="#" className="font-sans text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.25em] uppercase mb-6 text-primary-foreground/40 font-semibold">
              About
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Craftsmanship", "Materials", "Journal"].map((item) =>
              <li key={item}>
                  <a href={item === "Our Story" ? "/our-story" : "#"} className="font-sans text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.25em] uppercase mb-6 text-primary-foreground/40">
              Support
            </h4>
            <ul className="space-y-3">
              {["Contact", "Shipping", "Returns", "Size Guide"].map((item) =>
              <li key={item} className="font-semibold">
                  <a href="#" className="font-sans text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-primary-foreground/40">
            © 2026 Verve. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Privacy</a>
            <a href="/terms" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Terms</a>
            <a href="#" className="font-sans text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;