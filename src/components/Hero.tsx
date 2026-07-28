import heroImg1 from "@/assets/img1.jpg";
import heroImg2 from "@/assets/img2.jpg";
import heroImg3 from "@/assets/img3.jpg";
import { MapPin, ArrowDown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// Only images downloaded from mdgcarcenter.com — no old template images
const heroImages = [heroImg1, heroImg2, heroImg3];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[600px] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image Carousel — slow crossfade */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === currentSlide ? 1 : 0,
          }}
        />
      ))}
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0B0B0C]"></div>

      {/* Carousel Controls — minimal */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/15 bg-transparent flex items-center justify-center text-white/85 hover:text-white hover:border-white/30 transition-all duration-500"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/15 bg-transparent flex items-center justify-center text-white/85 hover:text-white hover:border-white/30 transition-all duration-500"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide Indicators — thin lines */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[1px] transition-all duration-700 ${
              index === currentSlide ? "bg-white w-10" : "bg-white/25 w-5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content — copy-rich, centered */}
      <div className="relative z-10 py-20 sm:py-28 text-center max-w-5xl mx-auto px-4 w-full">
        {/* Location pill */}
        <span className="bg-white/10 backdrop-blur-md text-[#ffff00] border border-[#ffff00]/30 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5" />
          Purullena, Granada
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight leading-tight mb-4">
          Vehículos de ocasión Premium y <span className="text-[#ffff00]">Certificados</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Explora nuestro stock seleccionado a mano en Purullena. Cada vehículo se
          revisa a fondo, se certifica y se entrega con garantía para que conduzcas
          con total tranquilidad.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/stock"
            className="bg-[#ffff00] text-black font-extrabold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Ver catálogo
            <ArrowDown className="w-4 h-4" />
          </Link>
          <Link
            to="/presupuestos"
            className="bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Pide tu coche a medida
          </Link>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-zinc-300 mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#ffff00]">✓</span> Vehículos revisados a fondo
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#ffff00]">✓</span> Garantía incluida
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#ffff00]">✓</span> Financiación disponible
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
