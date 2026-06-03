import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "./VehicleCard";
import { fetchCars, transformApiCarToVehicle, type Vehicle } from "@/services/carsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section className="relative py-24 overflow-hidden bg-[#f4f5f7]">

      <div className="relative z-10 container mx-auto px-4">
        {/* Header with carousel nav in top right */}
        <div className="flex items-end justify-between mb-14 max-w-7xl mx-auto">
          <div>
            <p className="text-gray-400 text-sm tracking-[0.2em] uppercase mb-3">Catálogo</p>
            <h2 className="text-4xl font-heading font-semibold text-gray-900">{t('vehicle_gallery.title')}</h2>
            <p className="text-gray-500 mt-3 max-w-xl">
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
                    ? "border-gray-400 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => canNext && setPage(p => p + 1)}
                disabled={!canNext}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  canNext
                    ? "border-gray-400 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-gray-400 text-xs ml-2">
                {page + 1} / {totalPages}
              </span>
            </div>
          )}
        </div>

        {isError && (
          <Alert className="max-w-md mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('vehicle_gallery.error_loading')}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                  <Skeleton className="h-8 w-full bg-gray-200" />
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
                      i === page ? "w-6 h-2 bg-gray-900" : "w-2 h-2 bg-gray-300 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
            <a
              href="/stock"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors"
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
