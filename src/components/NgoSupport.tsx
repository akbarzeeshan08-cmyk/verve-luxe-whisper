import { useEffect, useRef } from "react";
import ngo1 from "@/assets/ngo-1.jpg";
import ngo2 from "@/assets/ngo-2.jpg";
import ngo3 from "@/assets/ngo-3.jpg";
import ngo4 from "@/assets/ngo-4.jpg";
import ngo5 from "@/assets/ngo-5.jpg";
import ngo6 from "@/assets/ngo-6.jpg";

const images = [ngo1, ngo2, ngo3, ngo4, ngo5, ngo6];
const doubled = [...images, ...images];

const NgoSupport = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;

    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-accent mb-4 font-semibold">
            Giving Back
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-6">
            Every Purchase Saves a Life
          </h2>
          <p className="font-sans text-muted-foreground text-lg leading-relaxed">
            A portion of every Verve purchase is donated to{" "}
            <a
              href="https://earthlingstrust.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline"
            >
              Earthlings Trust
            </a>{" "}
            — a Noida-based NGO rescuing, sheltering, and rehabilitating
            abandoned dogs since 2018. Together, we've helped provide medical
            care, food, and forever homes to over 5,000 dogs.
          </p>
        </div>
      </div>

      {/* Auto-scrolling thumbnail strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden select-none pointer-events-none"
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Earthlings Trust dog rescue"
            className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-lg flex-shrink-0"
            loading="lazy"
            width={224}
            height={224}
            draggable={false}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-10 text-center">
        <a
          href="https://earthlingstrust.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-accent text-accent font-sans text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:bg-accent hover:text-foreground transition-colors duration-300"
        >
          Learn More About Earthlings Trust
        </a>
      </div>
    </section>
  );
};

export default NgoSupport;
