import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import heroBg from "@/assets/img2.jpg";
import { useState, useEffect, useCallback } from "react";

const OVERALL_RATING = 4.1;

const REVIEWS = [
  {
    name: "Carlos M.",
    rating: 5,
    date: "Hace 1 semana",
    review: "Excelente experiencia en Edition Cars. Compré un BMW Serie 3 y el proceso fue impecable desde el principio. El equipo fue muy profesional y transparente con toda la información del vehículo. Totalmente recomendable.",
    initial: "C",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Marta G.",
    rating: 5,
    date: "Hace 2 semanas",
    review: "Muy satisfecha con mi compra. Encontré exactamente el Mercedes que buscaba y me ayudaron con la financiación sin ningún problema. El coche estaba en perfectas condiciones, tal como lo describían.",
    initial: "M",
    color: "from-purple-600 to-purple-800",
  },
  {
    name: "David S.",
    rating: 4,
    date: "Hace 1 mes",
    review: "Buen servicio y trato muy amable. El proceso de compra fue rápido y sin complicaciones. El vehículo llegó en perfectas condiciones. Repetiría sin duda.",
    initial: "D",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    name: "Laura R.",
    rating: 5,
    date: "Hace 3 semanas",
    review: "Compré un Audi Q5 y quedé encantada. El equipo de Edition Cars se tomó el tiempo para explicarme todo con detalle. Precio justo y servicio de primera. 100% recomendable.",
    initial: "L",
    color: "from-rose-600 to-rose-800",
  },
  {
    name: "Jordi P.",
    rating: 4,
    date: "Hace 2 meses",
    review: "Gran selección de coches de ocasión y trato muy correcto. La gestión de la documentación fue rápida y eficiente. El vehículo estaba exactamente como lo describieron.",
    initial: "J",
    color: "from-amber-600 to-amber-800",
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => {
      const fill = Math.min(1, Math.max(0, rating - (star - 1)));
      return (
        <div key={star} className="relative w-4 h-4">
          <Star className="w-4 h-4 text-white/10 fill-white/10" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    })}
  </div>
);

const GoogleReviews = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const navigate = useCallback((next: number, dir: "left" | "right") => {
    setDirection(dir);
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 350);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate((current + 1) % REVIEWS.length, "right");
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, navigate]);

  const prev = () => navigate((current - 1 + REVIEWS.length) % REVIEWS.length, "left");
  const next = () => navigate((current + 1) % REVIEWS.length, "right");

  const review = REVIEWS[current];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010307]/95 via-[#010307]/90 to-[#010307]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            <span className="text-white/60 text-sm">Reseñas verificadas en Google</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-bold text-white">{OVERALL_RATING}</span>
            <div>
              <StarRating rating={OVERALL_RATING} />
              <p className="text-white/40 text-sm mt-1">Basado en 89+ reseñas</p>
            </div>
          </div>
        </div>

        {/* Review card */}
        <div className="relative max-w-3xl mx-auto">
          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            className="absolute -left-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 hover:border-white/40 transition-all z-10 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 hover:border-white/40 transition-all z-10 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Card */}
          <div
            className="relative bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : `translateX(${direction === "right" ? "30px" : "-30px"})`,
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="absolute top-8 right-10 opacity-10 pointer-events-none">
              <Quote className="w-16 h-16 text-white" />
            </div>

            <StarRating rating={review.rating} />

            <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light italic mt-6 mb-8">
              "{review.review}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <span className="text-white font-bold text-lg">{review.initial}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{review.name}</div>
                <div className="text-white/40 text-sm mt-0.5">{review.date}</div>
              </div>
              <img src={googleLogo} alt="Google" className="w-5 h-5 opacity-60" />
            </div>
          </div>
        </div>

        {/* Mobile nav + Dots */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="md:hidden w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i, i > current ? "right" : "left")}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-7 h-2 bg-white" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="md:hidden w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
