import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "./VehicleCard";
import { fetchCars, transformApiCarToVehicle, type Vehicle } from "@/services/carsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import galleryBg from "@/assets/img1.jpg";

const VISIBLE_COUNT = 4;

const VehicleGallery = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(0);

  const {
    data: carsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cars'],
    queryFn: () => fetchCars(),
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  const vehicles: Vehicle[] = carsResponse
    ? [...carsResponse.items.map(transformApiCarToVehicle)].sort((a, b) => {
        const statusOrder = (status: string) => status === 'Published' ? 0 : 1;
        const statusDiff = statusOrder(a.status) - statusOrder(b.status);
        if (statusDiff !== 0) return statusDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
    : [];

  const totalPages = Math.ceil(vehicles.length / VISIBLE_COUNT);
  const visibleVehicles = vehicles.slice(page * VISIBLE_COUNT, (page + 1) * VISIBLE_COUNT);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <section className="relative py-24 overflow-hidden bg-[#0B0B0C]">
      {/* Ambient background image with dark overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={galleryBg} alt="" className="w-full h-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C] via-[#0B0B0C]/85 to-[#0B0B0C]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header with carousel nav in top right */}
        <div className="flex items-end justify-between mb-14 max-w-7xl mx-auto">
          <div>
            <p className="text-[#ffff00] text-sm tracking-[0.25em] uppercase mb-3 font-semibold">Catálogo</p>
            <h2 className="text-4xl font-heading font-semibold text-white">{t('vehicle_gallery.title')}</h2>
            <p className="text-[#D4D4D8] mt-3 max-w-xl">
              {t('vehicle_gallery.subtitle')}
            </p>
          </div>

          {/* Round carousel buttons — top right of section header */}
          {!isLoading && vehicles.length > VISIBLE_COUNT && (
            <div className="flex items-center gap-2 flex-shrink-0 pb-1">
              <button
                onClick={() => canPrev && setPage(p => p - 1)}
                disabled={!canPrev}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  canPrev
                    ? "border-white/25 text-white hover:bg-[#ffff00] hover:text-black hover:border-[#ffff00] hover:shadow-[0_0_18px_-2px_rgba(255,255,0,0.5)]"
                    : "border-white/10 text-white/85 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => canNext && setPage(p => p + 1)}
                disabled={!canNext}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  canNext
                    ? "border-white/25 text-white hover:bg-[#ffff00] hover:text-black hover:border-[#ffff00] hover:shadow-[0_0_18px_-2px_rgba(255,255,0,0.5)]"
                    : "border-white/10 text-white/85 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-white/85 text-xs ml-2">
                {page + 1} / {totalPages}
              </span>
            </div>
          )}
        </div>

        {isError && (
          <Alert className="max-w-md mx-auto mb-8 bg-white border-slate-200 text-slate-900">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('vehicle_gallery.error_loading')}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-1/2 bg-white/10" />
                  <Skeleton className="h-8 w-full bg-white/10" />
                </div>
              </div>
            ))
          ) : (
            visibleVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))
          )}
        </div>

        {!isLoading && vehicles.length > 0 && (
          <div className="text-center mt-10 max-w-7xl mx-auto">
            {/* Page dots */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === page ? "w-6 h-2 bg-[#ffff00]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
            <a
              href="/stock"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ffff00] text-black text-sm font-bold rounded-lg hover:bg-[#e6e600] hover:shadow-[0_8px_24px_-4px_rgba(255,255,0,0.4)] transition-all duration-300"
            >
              {t('vehicle_gallery.view_cars')}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleGallery;
