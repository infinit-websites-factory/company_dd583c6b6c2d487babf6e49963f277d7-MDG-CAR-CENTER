import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import heroBg from "@/assets/img2.jpg";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGoogleReviews, type GoogleReviewItem } from "@/services/carsApi";

const avatarColors = [
  "from-blue-600 to-blue-800",
  "from-purple-600 to-purple-800",
  "from-emerald-600 to-emerald-800",
  "from-rose-600 to-rose-800",
  "from-amber-600 to-amber-800",
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

const ReviewCard = ({
  review,
  index,
  visible,
  direction,
}: {
  review: GoogleReviewItem;
  index: number;
  visible: boolean;
  direction: "left" | "right";
}) => {
  const initial = review.authorAttribution.displayName.charAt(0).toUpperCase();
  const color = avatarColors[index % avatarColors.length];

  return (
    <div
      className="relative bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : `translateX(${direction === "right" ? "30px" : "-30px"})`,
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-2xl pointer-events-none" />
      <div className="absolute top-8 right-10 opacity-10 pointer-events-none">
        <Quote className="w-16 h-16 text-white" />
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light italic mt-6 mb-8">
        "{review.text.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
        {review.authorAttribution.photoUri ? (
          <img
            src={review.authorAttribution.photoUri}
            alt={review.authorAttribution.displayName}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-lg"
            onError={(e) => {
              // Fallback to initial avatar if photo fails
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg ${review.authorAttribution.photoUri ? "hidden" : ""}`}
        >
          <span className="text-white font-bold text-lg">{initial}</span>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white">
            {review.authorAttribution.displayName}
          </div>
          <div className="text-white/40 text-sm mt-0.5">
            {review.relativePublishTimeDescription}
          </div>
        </div>
        <img src={googleLogo} alt="Google" className="w-5 h-5 opacity-60" />
      </div>
    </div>
  );
};

const GoogleReviews = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const { data, isError } = useQuery({
    queryKey: ["googleReviews"],
    queryFn: fetchGoogleReviews,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  const reviews: GoogleReviewItem[] = data?.google_reviews_sample ?? [];
  const overallRating = data?.google_rating ?? 4.1;
  const reviewCount = data?.google_review_count ?? 62;

  const navigate = useCallback((next: number, dir: "left" | "right") => {
    setDirection(dir);
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 350);
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setTimeout(() => {
      navigate((current + 1) % reviews.length, "right");
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, reviews.length, navigate]);

  const prev = () =>
    navigate((current - 1 + reviews.length) % reviews.length, "left");
  const next = () => navigate((current + 1) % reviews.length, "right");

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
            <span className="text-white/60 text-sm">
              Reseñas verificadas en Google
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-bold text-white">
              {overallRating}
            </span>
            <div>
              <StarRating rating={overallRating} />
              <p className="text-white/40 text-sm mt-1">
                Basado en {reviewCount}+ reseñas
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <div className="text-center text-white/40 py-8">
            {isError
              ? "No se pudieron cargar las reseñas en este momento."
              : "Cargando reseñas..."}
          </div>
        ) : (
          <>
            {/* Review card */}
            <div className="relative max-w-3xl mx-auto">
              {/* Prev/Next buttons */}
              {reviews.length > 1 && (
                <>
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
                </>
              )}

              <ReviewCard
                review={reviews[current]}
                index={current}
                visible={visible}
                direction={direction}
              />
            </div>

            {/* Mobile nav + Dots */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {reviews.length > 1 && (
                <button
                  onClick={prev}
                  className="md:hidden w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {reviews.length > 1 && (
                <div className="flex items-center gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        navigate(i, i > current ? "right" : "left")
                      }
                      className={`rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-7 h-2 bg-white"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
              {reviews.length > 1 && (
                <button
                  onClick={next}
                  className="md:hidden w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GoogleReviews;
