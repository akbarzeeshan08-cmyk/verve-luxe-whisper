import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Collars", href: "#collections" },
    { label: "Leashes", href: "#collections" },
    { label: "Dog Coats", href: "#collections" },
    { label: "Our Story", href: "/our-story" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Left nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 2).map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <a href="/" className="font-serif text-2xl lg:text-3xl tracking-wider text-foreground">
          VERVE
        </a>

        {/* Right nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.slice(2).map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart icon */}
        <button className="text-foreground hover:text-accent transition-colors" aria-label="Cart">
          <ShoppingBag size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
