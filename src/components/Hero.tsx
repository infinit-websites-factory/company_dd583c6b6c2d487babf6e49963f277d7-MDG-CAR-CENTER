import heroImg1 from "@/assets/img1.jpg";
import heroImg2 from "@/assets/img2.jpg";
import heroImg3 from "@/assets/img3.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Only images downloaded from editioncars.es — no old template images
const heroImages = [heroImg1, heroImg2, heroImg3];

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/stock?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/stock');
    }
  };

  return (
    <section className="relative h-[600px] md:h-[85vh] flex items-center overflow-hidden">
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
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>

      {/* Carousel Controls — minimal */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/15 bg-transparent flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-500"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/15 bg-transparent flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-500"
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

      {/* Content — serif, centered, spacious */}
      <div className="relative z-10 text-center text-white container mx-auto px-4 w-full flex flex-col items-center">
        <div className="w-12 h-[1px] bg-white/20 mb-10"></div>
        <p className="text-[11px] md:text-xs font-body uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">
          {t('hero.subtitle')} {cityName}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal mb-12 leading-[1.1] tracking-tight text-white">
          {t('hero.title')}
        </h1>

        {/* Search Bar — sharp, minimal */}
        <form onSubmit={handleSearch} className="w-full max-w-lg">
          <div className="flex gap-0 overflow-hidden border border-white/15 bg-[#101318] backdrop-blur-sm">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-0 text-white placeholder:text-white/30 h-12 pl-5 focus-visible:ring-0 focus-visible:ring-offset-0 font-body text-sm font-light tracking-wide"
              />
            </div>
            <Button type="submit" className="rounded-none px-6 h-12 text-[11px]">
              <Search className="h-4 w-4 mr-2" />
              {t('common.search')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
